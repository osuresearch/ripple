import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { FocusScope, useFocusRing } from 'react-aria';
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { Comment } from '../TextEditor/comment';
import { CommentFocus } from '../TextEditor/comment-focus';
import { useAnnotationsContext } from '../../hooks/useAnnotationsContext';
import { useFrame } from 'react-frame-component';
import { AnnotationPopover } from './AnnotationPopover';
import { isInViewport } from '../../react/utils';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ActiveMark = Rect & {
  id: string;
};

/**
 * Utility to retrieve all comment-views present with a thread reference
 *
 * @param editor
 */
function getCurrentThreadIDs(editor: Editor): Set<AnnotationID> {
  // The ProseEditor way of navigating the node tree is a bit complex
  // (see: https://discuss.prosemirror.net/t/best-method-for-collecting-all-marks-in-a-block/2883)

  // Instead, we just rely on DOM queries to simplify things.
  // If this doesn't scale in the future, look into Node-based iteration.

  const views = editor.view.dom.querySelectorAll<HTMLElement>('comment-view');
  const ids = new Set<AnnotationID>();
  views.forEach((el) => el.dataset.comment && ids.add(el.dataset.comment));

  return ids;
}

function rectAtPos(window: Window, editor: Editor, from: number): Rect {
  const pos = editor.view.coordsAtPos(from);
  return {
    x: pos.left,
    y: pos.top + window.scrollY,
    width: 0,
    height: pos.bottom - pos.top
  };
}

export type ReviewableProps = {
  name: string;
  content: string;
};

/**
 * A reviewable element can contain multiple selection ranges,
 * each tied to a comment thread.
 *
 * New threads can be added created by selecting new ranges,
 * and clicking a range associated with a thread will focus
 * that thread for the user to interact with.
 *
 * TODO: Break this component down more. Anchor is a good candidate for some of this
 * (at least the positioning pieces)
 */
export const Reviewable = forwardRef<HTMLDivElement, ReviewableProps>(({ name, content }, ref) => {
  const [isTextSelected, setIsTextSelected] = useState(false);
  const { window } = useFrame();

  // Global context for the entire document for thread management
  const { annotations, focused, createThread, focus, clearFocus } = useAnnotationsContext();

  // Track threads that are currently associated with this reviewable section
  const [threadIds, setThreadIds] = useState<AnnotationID[]>([]);

  const [selectionCoords, setSelectionCoords] = useState<Rect>();

  // Track the currently clicked on Tiptap comment mark
  const [activeMark, setActiveMark] = useState<ActiveMark>();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false
      }),

      Comment.configure({}),

      CommentFocus.configure({})
    ],

    onSelectionUpdate: ({ editor }) => {
      // checkForClickedComment(editor);
      checkForUpdatedSelection(editor);
    },

    onBlur({ editor }) {
      // setIsTextSelected(false);
    },

    editorProps: {
      attributes: {
        spellcheck: 'false',
        tabindex: '0'
      }
    },

    content,
    editable: false
  });

  // On editor load we want to aggregate the list of initial
  // threads that we're tracking changes against.
  useEffect(() => {
    if (!editor) {
      return;
    }

    // const ids = getCurrentThreadIDs(editor);
    // console.log('UPDATE MARKS (mount)', ids);

    const ids = new Set<AnnotationID>();

    // Find threads that are associated with this field but we don't track yet
    annotations.forEach((t) => t.target.source === name && ids.add(t.id));

    setThreadIds(Array.from(ids));
  }, [editor]);

  const checkForUpdatedSelection = (editor: Editor) => {
    const { from, to, empty, $from, $head, $anchor } = editor.state.selection;
    const mark = editor.isActive('comment');
    const focusMark = editor.isActive('comment-focus');

    // Ignore - we clicked something that already had focus
    if (focusMark) {
      return;
    }

    // Update global anchor information to our selection range.
    // This will help us position comments / popovers later
    if (!empty && to - from > 1) {
      setSelectionCoords(rectAtPos(window as Window, editor, from));
      setIsTextSelected(true);
      return;
    }
    // TODO: The above fires if we click a thread that changes selection focus.

    // If we click inside a comment mark, it takes selection priority.
    if (mark && editor.isFocused) {
      const id = editor.getAttributes('comment').comment;
      focus(id);
    }

    setSelectionCoords(undefined);
    setIsTextSelected(false);
  };

  const reapplyMarks = (editor: Editor, threads: Annotation[]) => {
    console.log('reapply marks', editor, threads);

    // Remove all comment marks
    const commands = editor.chain().selectAll().unsetComment().unsetCommentFocus();

    // Re-apply comment marks for the specified threads.
    // We don't mark deleted or resolved threads.
    // However, if the user focuses a resolved thread, we
    // show the focus mark.
    threads.forEach((t) => {
      const { deleted, resolved } = t.body.find(
        (b) => b.type === 'RippleThread'
      ) as AnnotationThreadBody;

      if (!deleted && !resolved) {
        commands
          .setTextSelection({
            from: (t.target.selector as RippleAnnoSelector).start ?? 0,
            to: (t.target.selector as RippleAnnoSelector).end ?? 0
          })
          .setComment(t.id);
      }
    });

    // Select the focused thread if it's in our group
    // This can merge with the above.
    threads.forEach(
      (t) =>
        t.id === focused?.id &&
        commands
          .setTextSelection({
            from: (t.target.selector as RippleAnnoSelector).start ?? 0,
            to: (t.target.selector as RippleAnnoSelector).end ?? 0
          })
          .setCommentFocus(t.id)
    );

    // Reset selection and run batch
    commands.setTextSelection(0).run();
  };

  const addCommentOnSelection = () => {
    if (editor?.state.selection) {
      // This is a TextSelection (concrete of the abstract Selection)
      // returned by the comment Tiptap plugin
      const { from, to, empty, $from, $head, $anchor } = editor.state.selection;

      const fromPos = editor.view.coordsAtPos(from);
      setSelectionCoords({
        x: fromPos.left,
        y: fromPos.top,
        width: 16,
        height: fromPos.bottom - fromPos.top
      });

      if (!empty) {
        const context = editor.state.doc.textBetween(from, to, ' ');

        const thread = createThread(name, 'commenting', {
          type: 'RippleAnnoSelector',
          subtype: 'highlight',
          // TODO: Instance ID support
          top: fromPos.top + (window?.scrollY ?? 0),
          // left: fromPos.left,
          // bottom: fromPos.bottom - fromPos.top + (window?.scrollY ?? 0)

          start: from,
          end: to
        });

        // Add to the list of tracked threads
        setThreadIds((prev) => [...prev, thread.id]);
      }
    }

    setIsTextSelected(false);
  };

  const [markCount, setMarkCount] = useState(0);

  // Update the editor marks when threads are added or removed
  useEffect(() => {
    if (!editor) {
      return;
    }

    // TODO: More optimal way of doing this that doesn't rely
    // on iterating *all* threads during changes.

    // Filter down to threads we're tracking
    const trackedThreads = annotations.filter((t) => threadIds.includes(t.id));

    // Sum up threads that haven't been deleted or resolved
    let totalVisible = 0;
    trackedThreads.forEach((t) => {
      const { deleted, resolved } = t.body.find(
        (b) => b.type === 'RippleThread'
      ) as AnnotationThreadBody;

      if (!deleted && !resolved) {
        totalVisible++;
      }
    });

    // Threads were either added or removed.
    // Reapply marks to the Tiptap DOM.
    if (totalVisible !== markCount) {
      reapplyMarks(editor, trackedThreads);
      setMarkCount(totalVisible);
    }
  }, [editor, annotations, threadIds]);

  // If a tracked thread is focused, update our marker to match
  useEffect(() => {
    if (!editor) {
      return;
    }

    // Start commands by removing comment-focus from anything that was
    // previously focused on this instance.
    const commands = editor.chain().selectAll().unsetCommentFocus().setTextSelection(0);

    const range = { from: 0, to: 0 };
    if (focused?.target.selector?.type === 'RippleAnnoSelector') {
      range.from = focused.target.selector.start ?? 0;
      range.to = focused.target.selector.end ?? 0;
    }

    if (!focused) {
      setActiveMark(undefined);
      commands.run();
      return;
    }

    const { deleted } = focused?.body.find(
      (b) => b.type === 'RippleThread'
    ) as AnnotationThreadBody;
    if (deleted || !threadIds.includes(focused.id)) {
      setActiveMark(undefined);
      commands.run();
      return;
    }

    // Find the updated context position in the editor
    const pos = rectAtPos(window as Window, editor, range.from);

    setActiveMark({
      id: focused.id,
      ...pos
    });

    scrollIntoView(pos);

    // Wrap it with a comment-focus mark
    commands.setTextSelection(range).setCommentFocus(focused.id).run();
  }, [editor, threadIds, focused]);

  const scrollIntoView = (rect: Rect) => {
    if (!window) return;

    // TODO: It'd be better if this scrolled to align
    // with the comment thread, wherever it may be.
    if (!isInViewport(window, rect)) {
      window.scrollTo(rect.x, rect.y - 100);
    }
  };

  const { isFocused, focusProps } = useFocusRing({
    within: true
  });

  return (
    <div ref={ref} className="ripple-reviewable" {...focusProps}>
      <EditorContent editor={editor} />

      {isTextSelected && selectionCoords && isFocused && (
        <AnnotationPopover coords={selectionCoords} onAddComment={addCommentOnSelection} />
      )}

      {/* <div style={{ border: '1px solid red' }}>
        <strong>Debug things, please ignore</strong>
        <br/>
        Prefiltered DOM content: <br/>
        <code>{content}</code><br/>
        {editor?.isFocused ? 'focused' : 'not focused'}<br/>
        {isTextSelected ? ' has selection' : ' not selected'}<br/>
        {isFocused ? ' focused within' : 'not focused within'}<br/>
        {activeMark ? (` mark: ${activeMark.id} @ ${activeMark.x}, ${activeMark.y}`) : ' no mark'}<br/>
        selection: {selectionCoords?.x}, {selectionCoords?.y}<br/>
      </div> */}
      {/* {selectionCoords &&
      <div className="ripple-reviewable__marker" style={{
        pointerEvents: 'none',
        position: 'absolute',
        opacity: 0.5,
        backgroundColor: 'red',

        top: selectionCoords.y,
        left: selectionCoords.x,
        width: 16,
        height: selectionCoords.height
      }} />
    } */}

      {/* {activeMark &&
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        opacity: 0.5,
        backgroundColor: 'green',
        // Account for iframe scrolling
        top: activeMark.y, // + (window?.scrollY ?? 0),
        left: activeMark.x,
        width: 4,
        height: activeMark.height,
      }} />
    } */}
    </div>
  );
});
