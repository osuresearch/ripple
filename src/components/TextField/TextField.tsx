import React, { useRef, useEffect, useState, useId } from 'react';
import { FormField } from '@osuresearch/ui';
import { Editor, Extensions } from '@tiptap/core';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import TiptapText from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { NoNewLine } from './NoNewLine';

import { BaseFieldProps } from '../../react/types';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// TODO_YJS: import { Collaboration } from './collab';
// TODO_YJS: import { ydoc, provider as rtcProvider } from '../../yjs';
// TODO_YJS: import { WebrtcProvider } from 'y-webrtc';
import { CharacterLimit } from './CharacterLimit';
import { styled } from '@mui/material';

// TODO_YJS: import './collab-cursor.css';

const Container = styled('div')<{ height: number }>(({ theme, height }) => ({
  'width': '100%',
  '.ProseMirror': {
    'minHeight': `${height}rem`,
    'border': '2px solid red',

    '&.ProseMirror-focused': {
      outline: 'none'
    }
  }
}));

export type TextEditorProps = BaseFieldProps<string> & {
  limit?: number;

  /**
   * Initial height of the text container in CSS REM units.
   * The container will automatically grow in response to
   * its contents.
   *
   * Defaults to `5`.
   */
  height?: number;

  /**
   * Disable newlines. Set to true to mimic simple `<input type="text" />` inputs.
   *
   * Do note that text will still wrap in the editor.
   */
  noNewline: boolean;
};

/**
 * The Ripple Text Field is an enhanced field that supports:
 * - Rich text editing
 * - Markdown WYSIWYG
 * - In-field collaboration and annotation
 */
export function TextField({ limit = 0, height = 5, noNewline, ...props }: TextEditorProps) {
  // TODO_YJS: const [provider, setProvider] = useState<WebrtcProvider>();

  const { name, onChange, onBlur, value, isDisabled } = props;

  const id = useId();

  useEffect(() => {
    // TODO_YJS:   setProvider(rtcProvider);
  }, []);

  // TODO_YJS:
  // const extensions = provider
  //   ? [
  //       // Placeholder.configure({
  //       //   placeholder: 'Start typing...'
  //       // }),

  //       StarterKit.configure({
  //         history: false
  //       }),

  //       // Collaboration.configure({
  //       //   document: ydoc,
  //       //   provider,
  //       //   field: name + '-tiptap',
  //       //   user: { color: '#3daee9', name: 'John Doe' }
  //       // }),

  //       CharacterCount.configure({
  //         limit
  //       }),
  //     ]
  //   : [Placeholder.configure({ placeholder: 'Loading...' }), StarterKit];

  const extensions = [
    StarterKit,
    Placeholder.configure({ placeholder: 'Loading...' }),
    CharacterCount.configure({ limit })
  ];

  if (noNewline) {
    extensions.push(NoNewLine);
  }

  const editor = useEditor(
    {
      content: value,
      extensions: extensions as Extensions, // TODO: Fix typing.
      editable: !isDisabled,

      // Sync up when the user types
      // TODO: Throttle this a bit. Or on the yjs side.
      onUpdate: ({ editor }) => {
        if (onChange) {
          onChange(editor.getHTML());
        }
      },

      onBlur({ editor }) {
        if (onChange) {
          onChange(editor.getHTML());
        }
      },

      editorProps: {
        attributes: {
          // Spellcheck breaks when we have remote users highlighting
          // sections of words, or a word is broken with a comment span.
          spellcheck: 'false'
        }
      }
    }
    // TODO_YJS: [provider]
  );

  return (
    <FormField<string>
      {...props}
      id={id}
      name={name}
      renderInput={(props) => (
        <Container height={height}>
          <EditorContent
            editor={editor}
            id={props.id}
            aria-labelledby={props['aria-labelledby']}
            aria-describedby={props['aria-describedby']}
            // className={cx(
            //   'rui-w-full rui-p-xs rui-border-2',
            //   { 'rui-border-light-shade': !editor?.isFocused },
            //   { 'rui-border-dark-shade': editor?.isFocused },

            //   // { 'rui-border-dimmed rui-bg-light-shade': props.disabled },
            //   { 'rui-border-error': props['aria-invalid'] }
            // )}
            // TODO: disabled, readOnly, value, name, onBlur (null), type: text
          />

          {limit > 0 && (
            <CharacterLimit
              limit={limit}
              count={editor?.storage.characterCount?.characters() ?? 0}
            />
          )}
        </Container>
      )}
    />
  );
}
