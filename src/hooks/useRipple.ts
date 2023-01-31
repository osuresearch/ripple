import React, { createContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, RippleDispatch } from '../store';
import { defaultComponent, FieldComponentType } from '../react';
import { useRippleForm, UseRippleFormReturn } from './useRippleForm';

export type RippleOptions = {
  /**
   * Mapping between a component name and a React component to render a field.
   *
   * If your form definition contains custom field components, you will define
   * your mapping here.
   */
  components: Record<string, FieldComponentType>;
};

export type RippleContext = {
  form: FormDefinition;
  options: RippleOptions;

  // Needed? Redux is a pretty heavy dependency for this.
  // Does let me control form stuff outside the form though...
  // I can localize settings and all that for the end user
  // and other libraries.
  dispatch: () => RippleDispatch;
  selector: TypedUseSelectorHook<RootState>;
} & UseRippleFormReturn<any, any>;

export type UseRippleReturn<T extends FormDefinition> = RippleContext;

export const context = createContext<RippleContext>({} as RippleContext);

export function useRipple<T extends FormDefinition>(
  form: T,
  options: Partial<RippleOptions> = {}
): UseRippleReturn<T> {
  const opt: RippleOptions = {
    components: {},
    ...options
  };

  // Wire up to RHF
  const rform = useRippleForm({
    mode: 'onBlur'
  });

  // Simplistic form, similar to RHF useForm()
  // Retval can be passed into a <Ripple> component for providing context.
  return {
    form,
    options: opt,
    dispatch: useDispatch,
    selector: useSelector,
    ...rform
  };
}
