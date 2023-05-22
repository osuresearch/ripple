import { useContext } from 'react';
import { RippleContext, IRippleContext } from './useRipple';
import { FormDefinition } from '../types';

export type UseRippleContextReturn<T extends FormDefinition> = IRippleContext;

export function useRippleContext<T extends FormDefinition>(): UseRippleContextReturn<T> {
  const ctx = useContext(RippleContext);
  if (!ctx) {
    throw new Error(
      'Cannot call useRippleContext outside of a Ripple context',
    );
  }
  return ctx;
}
