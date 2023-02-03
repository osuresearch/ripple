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
  components: Record<string, FieldComponentType<any>>;
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

  getPreviousPage: (page: PageName) =>
    | {
        name: PageName;
        definition: PageDefinition;
      }
    | undefined;

  getNextPage: (page: PageName) =>
    | {
        name: PageName;
        definition: PageDefinition;
      }
    | undefined;
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
    getNextPage: (page: PageName) => {
      // TODO: Condition magic
      const keys = Object.keys(form.pages);

      const idx = keys.indexOf(page);
      if (idx > -1 && idx < keys.length - 1) {
        return {
          name: keys[idx + 1],
          definition: form.pages[keys[idx + 1]]
        };
      }
    },
    getPreviousPage: (page: PageName) => {
      // TODO: Condition magic
      const keys = Object.keys(form.pages);

      const idx = keys.indexOf(page);
      if (idx > -1 && idx > 0) {
        return {
          name: keys[idx - 1],
          definition: form.pages[keys[idx - 1]]
        };
      }
    },
    ...rform
  };
}
