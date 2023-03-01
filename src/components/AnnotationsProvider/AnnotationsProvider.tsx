import React from 'react';
import { useAnnotations, Context } from '../../hooks/useAnnotations';

export type AnnotationsProviderProps = {
  children: React.ReactNode;
  initialItems?: Annotation[];
};

/**
 * Thin wrapper around the useAnnotations hook.
 */
export function AnnotationsProvider({ children, initialItems }: AnnotationsProviderProps) {
  const ctx = useAnnotations(initialItems);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
