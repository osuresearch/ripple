import { useContext } from 'react';
import { context, RippleContext } from './useRipple';
import { FormDefinition } from '../types';

export type UseRippleContextReturn<T extends FormDefinition> = RippleContext;

export function useRippleContext<T extends FormDefinition>(): UseRippleContextReturn<T> {
  const ctx = useContext(context);
  return ctx;
}
