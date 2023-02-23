import { useContext } from 'react';
import { CommentsContext, Context } from './useCommenting';

export type UseCommentingContextReturn = CommentsContext;

export function useCommentingContext(): UseCommentingContextReturn {
  const ctx = useContext(Context);
  return ctx;
}
