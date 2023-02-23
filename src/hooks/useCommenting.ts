import { createContext, Key, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useListData } from 'react-stately';

export type CommentsContext = {
  /**
   * Start a new thread and focus it
   */
  startThread: (context: ThreadContext) => Thread;

  /**
   * Focus a thread, if possible
   */
  focusThread: (id: ThreadID, target?: DOMRect) => void;

  clearFocus: () => void;

  patchThread: (id: ThreadID, action: (prev: Thread) => Thread) => void;

  patchReply: (
    id: ThreadID,
    replyId: string,
    action: (prev: ThreadReply, thread: Thread) => ThreadReply
  ) => void;

  /**
   * Update the DOM rect of the context for this thread.
   *
   * This may be executed when the document is reflowed (e.g. window resizes or edits)
   * and may trigger the ordering of threads to be changed to better account for
   * relative DOM positions.
   */
  updateContextRect: (id: ThreadID, rect: DOMRect) => void;

  /**
   * Currently focused thread
   */
  focused?: Thread;

  /**
   * All threads
   */
  threads: Thread[];
};

export const Context = createContext<CommentsContext>({} as CommentsContext);

export type UseCommentingReturn = CommentsContext;

export function useCommenting(initialThreads: Thread[] = []): UseCommentingReturn {
  // React-stately will do the heavy lifting of list management
  const { items, selectedKeys, getItem, append, update, setSelectedKeys } = useListData<Thread>({
    initialItems: initialThreads,
    getKey: (thread) => thread.id
  });

  return useMemo<UseCommentingReturn>(() => {
    const focusedThreadId = (selectedKeys as Set<Key>).values().next().value;

    // debugger;
    return {
      threads: items,
      focused: focusedThreadId ? getItem(focusedThreadId) : undefined,
      focusThread(id, target) {
        if (target) {
          const thread = getItem(id);
          update(id, {
            ...thread,
            context: {
              ...thread.context,
              rect: target
            }
          });
        }

        setSelectedKeys(new Set([id]));
      },
      clearFocus() {
        console.log('clearFocus');
        setSelectedKeys(new Set());
      },
      startThread(context) {
        const thread: Thread = {
          id: uuidv4(),
          // TODO: This should be an option for useCommenting
          // Swap Person for CommonIdentity / AtomicIdentity
          person: {
            id: 'test',
            name: 'Chase',
            username: 'mcmanning.1',
            email: 'mcmanning.1@osu.edu'
          },
          role: 'Test',
          message: '',
          date: Date.now(),
          replies: [],
          context
        };

        append(thread);
        setSelectedKeys(new Set([thread.id]));
        console.log('startThread', thread);
        return thread;
      },

      patchThread(id, action) {
        const thread = getItem(id);
        update(id, action(thread));
      },

      patchReply(id, replyId, action) {
        const thread = getItem(id);
        update(id, {
          ...thread,
          replies: thread.replies?.map((r) => {
            if (r.id === replyId) {
              return action(r, thread);
            }
            return r;
          })
        });
      },

      updateContextRect(id: ThreadID, rect: DOMRect) {
        const thread = getItem(id);
        update(id, {
          ...thread,
          context: {
            ...thread.context,
            rect
          }
        });

        // TODO: Sort threads based on DOMRect.top values.
      }
    };
    // Probably don't need exhaustive deps, I *think* append/getItem/etc are stable?
  }, [items, selectedKeys]);

  // some way to pull comments for a specific page / field?
  // various filtering behaviour? (reviewers, staff, etc)
  // resolving/unresolving
  // replying
}
