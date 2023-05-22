import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

// Ref: https://github.com/ueberdosis/tiptap/issues/313
export const NoNewLine = Extension.create({
  name: 'no_newline',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('eventHandler'),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              console.log("enter pressed")
              return true
            }
          }
        },
      }),
    ]
  },
});
