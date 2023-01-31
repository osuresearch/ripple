import { useContext } from 'react';
import { context, RippleContext } from './useRipple';

export type UseRippleContextReturn<T extends FormDefinition> = RippleContext;

export function useRippleContext<T extends FormDefinition>(): UseRippleContextReturn<T> {
  const ctx = useContext(context);
  return ctx;
}
