import { useEffect, useMemo, useState } from 'react';
import { useCommentingContext } from './useCommentingContext';
import { v4 as uuidv4 } from 'uuid';

export type UseThreadReturn = {
  thread?: Thread;
  focused: boolean;

  /** Focus the thread in the UI */
  focus: () => void;

  /** Update the main comment on the thread */
  updateComment: (message: string) => void;

  /** Remove (delete) the thread */
  remove: (recoverable?: boolean) => void;

  /** Undo a previously removed thread */
  recover: () => void;

  /** Resolve the thread as complete */
  resolve: () => void;

  /** Unresolve the previously resolved thread */
  reopen: () => void;

  /** Add a reply to the thread */
  addReply: (message: string) => void;

  updateReply: (id: ThreadReplyID, message: string) => void;

  removeReply: (id: ThreadReplyID, recoverable?: boolean) => void;

  recoverReply: (id: ThreadReplyID) => void;
};

export function useThread(id: ThreadID): UseThreadReturn {
  const { threads, focused, patchThread, patchReply, focusThread } = useCommentingContext();

  const [thread, setThread] = useState<Thread>();

  // If the thread list updates, check if the monitored
  // thread needs to be updated due to reference/data change
  useEffect(() => {
    const match = threads.find((t) => t.id === id);

    // Reference change (thus data change)
    if (match && match !== thread) {
      setThread(match);
    }
  }, [threads]);

  // TODO: patchThread may regenerate all the threads anyway
  // anytime *any* change. Might not be the best route here.

  return useMemo<UseThreadReturn>(
    () =>
      // debugger;

      ({
        thread,
        focused: focused?.id === id,
        focus: () => {
          thread && focusThread(thread.id);
        },

        updateComment: (message: string) => {
          thread &&
            patchThread(thread.id, (prev) => ({
              ...prev,
              message
            }));
        },

        remove: (recoverable = true) => {
          thread &&
            patchThread(thread.id, (prev) => ({
              ...prev,
              deleted: true,
              recoverable
            }));
        },

        recover: () => {
          thread &&
            patchThread(thread.id, (prev) => ({
              ...prev,
              deleted: false
            }));
        },

        resolve: () => {
          thread &&
            patchThread(thread.id, (prev) => ({
              ...prev,
              resolved: true
            }));
        },

        reopen: () => {
          thread &&
            patchThread(thread.id, (prev) => ({
              ...prev,
              resolved: false
            }));
        },

        addReply: (message: string) => {
          thread &&
            patchThread(thread.id, (prev) => ({
              ...prev,
              replies: [
                ...prev.replies,
                {
                  id: uuidv4(),
                  person: {
                    id: 'test',
                    name: 'Chase',
                    username: 'mcmanning.1',
                    email: 'mcmanning.1@osu.edu'
                  },
                  role: 'Test',
                  message,
                  date: Date.now()
                }
              ]
            }));
        },

        updateReply: (id: ThreadReplyID, message: string) => {
          thread &&
            patchReply(thread.id, id, (prev) => ({
              ...prev,
              message
            }));
        },

        removeReply: (id: ThreadReplyID, recoverable = true) => {
          thread &&
            patchReply(thread.id, id, (prev) => ({
              ...prev,
              deleted: true,
              recoverable
            }));
        },

        recoverReply: (id: ThreadReplyID) => {
          thread &&
            patchReply(thread.id, id, (prev) => ({
              ...prev,
              deleted: false
            }));
        }
      }),
    [thread, patchThread, patchReply, focusThread]
  );
}
