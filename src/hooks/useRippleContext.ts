import { useContext } from 'react';
import { RippleContext, IRippleContext } from './useRipple';
import { FormDefinition } from '../types';

export type UseRippleContextReturn<T extends FormDefinition> = IRippleContext;

export function useRippleContext<T extends FormDefinition>(): UseRippleContextReturn<T> {
  const ctx = useContext(RippleContext);
  return ctx;
}
