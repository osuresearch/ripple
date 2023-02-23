import React from 'react';
import { useCommenting, Context } from '../../hooks/useCommenting';

export type CommentsProviderProps = {
  children: React.ReactNode;
  initialThreads?: Thread[];
};

/**
 * Thin wrapper around the useCommenting hook.
 *
 * TODO: Omit from library?
 */
export function CommentsProvider({ children, initialThreads }: CommentsProviderProps) {
  const ctx = useCommenting(initialThreads);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
