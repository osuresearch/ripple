import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { FocusScope, useFocusRing } from 'react-aria';
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { Comment } from '../TextEditor/comment';
import { CommentFocus } from '../TextEditor/comment-focus';
import { useCommentingContext } from '../../hooks/useCommentingContext';
import { useFrame } from 'react-frame-component';
import { ReviewPopover } from './ReviewPopover';
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
function getCurrentThreadIDs(editor: Editor): Set<ThreadID> {
  // The ProseEditor way of navigating the node tree is a bit complex
  // (see: https://discuss.prosemirror.net/t/best-method-for-collecting-all-marks-in-a-block/2883)

  // Instead, we just rely on DOM queries to simplify things.
  // If this doesn't scale in the future, look into Node-based iteration.

  const views = editor.view.dom.querySelectorAll<HTMLElement>('comment-view');
  const ids = new Set<ThreadID>();
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
  const { window, document } = useFrame();

  // Global context for the entire document for thread management
  const { threads, focused, startThread, focusThread, clearFocus } = useCommentingContext();

  // Track threads that are currently associated with this reviewable section
  const [threadIds, setThreadIds] = useState<ThreadID[]>([]);

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

    const ids = new Set<ThreadID>();

    // Find threads that are loaded for this context but we don't track yet
    threads.forEach((t) => t.context.field === name && ids.add(t.id));

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
      focusThread(id);
    }

    setSelectionCoords(undefined);
    setIsTextSelected(false);
  };

  const reapplyMarks = (editor: Editor, threads: Thread[]) => {
    console.log('reapply marks', editor, threads);

    // Remove all comment marks
    const commands = editor.chain().selectAll().unsetComment().unsetCommentFocus();

    // Re-apply comment marks for the specified threads.
    // We don't mark deleted or resolved threads.
    // However, if the user focuses a resolved thread, we
    // show the focus mark.
    threads.forEach(
      (t) =>
        !t.deleted &&
        !t.resolved &&
        commands
          .setTextSelection({
            from: t.context.from,
            to: t.context.to
          })
          .setComment(t.id)
    );

    // Select the focused thread if it's in our group
    threads.forEach(
      (t) =>
        t.id === focused?.id &&
        commands
          .setTextSelection({
            from: t.context.from,
            to: t.context.to
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

        const thread = startThread({
          field: name,

          // TODO: I reconstruct a TextSelection from these. But is this position
          // the same thing as a TextSelection Range?
          from,
          to,

          rect: new DOMRect(
            fromPos.left,
            fromPos.top + (window?.scrollY ?? 0),
            0, // Width isn't calculated for these
            fromPos.bottom - fromPos.top + (window?.scrollY ?? 0)
          )
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
    const trackedThreads = threads.filter((t) => threadIds.includes(t.id));

    // Sum up threads that haven't been deleted or resolved
    let totalVisible = 0;
    trackedThreads.forEach((t) => {
      if (!t.deleted && !t.resolved) {
        totalVisible++;
      }
    });

    // Threads were either added or removed.
    // Reapply marks to the Tiptap DOM.
    if (totalVisible !== markCount) {
      reapplyMarks(editor, trackedThreads);
      setMarkCount(totalVisible);
    }
  }, [editor, threads, threadIds]);

  // If a tracked thread is focused, update our marker to match
  useEffect(() => {
    if (!editor) {
      return;
    }

    // Start commands by removing comment-focus from anything that was
    // previously focused on this instance.
    const commands = editor.chain().selectAll().unsetCommentFocus().setTextSelection(0);

    if (focused && !focused.deleted && focused.context.rect && threadIds.includes(focused.id)) {
      // Find the updated context position in the editor
      const pos = rectAtPos(window as Window, editor, focused.context.from);

      setActiveMark({
        id: focused.id,
        ...pos
      });

      // Wrap it with a comment-focus mark
      commands
        .setTextSelection({
          from: focused.context.from,
          to: focused.context.to
        })
        .setCommentFocus(focused.id);

      scrollIntoView(pos);
    } else {
      setActiveMark(undefined);
    }

    commands.run();
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
        <ReviewPopover coords={selectionCoords} onAddComment={addCommentOnSelection} />
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
