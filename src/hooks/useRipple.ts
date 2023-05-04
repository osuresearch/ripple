import React, { createContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, RippleDispatch } from '../store';
import { FieldComponentType } from '../react';
import { useRippleForm, UseRippleFormReturn } from './useRippleForm';
import { LocalStoragePersistence } from '../providers/LocalStoragePersistence';
import { ClientsideValidation } from '../providers/ClientsideValidation';
import { NullLookup } from '../providers/NullLookup';
import { getNextPage, getPreviousPage } from '../tools';
import { RipplePersistenceProvider, RippleLookupProvider, RippleValidationProvider, FormDefinition, PageName, PageDefinition, FormResponses } from '../types';

import { defaultComponent } from '../react/mappings';
import { UseFormReturn, useForm } from 'react-hook-form';

export type RippleOptions = {
  /**
   * Mapping between a component name and a React component to render a field.
   *
   * If your form definition contains custom field components, you will define
   * your mapping here.
   */
  components: Record<string, FieldComponentType<any> | undefined>;

  /**
   * Service layer for persisting response changes within the form.
   */
  persistence: RipplePersistenceProvider;

  /**
   * Service layers for providing options in named lookup fields
   *
   * Multiple lookups may be attached, each capable of resolving
   * its own collection of datasets.
   */
  lookup: RippleLookupProvider[];

  /**
   * Service layers for validating responses and form state.
   *
   * Multiple validators may be attached, for example one to
   * validate state clientside and another to perform serverside
   * validation for more complex business logic.
   */
  validation: RippleValidationProvider[];
};

export type IRippleContext = {
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
} & UseFormReturn<FormResponses, any>;

export type UseRippleReturn<T extends FormDefinition> = IRippleContext;

export const RippleContext = createContext<IRippleContext>({} as IRippleContext);

export function useRipple<T extends FormDefinition>(
  form: T,
  options: Partial<RippleOptions> = {}
): UseRippleReturn<T> {
  const { components, ...otherOptions } = options;

  const opt: RippleOptions = {
    // Default options
    persistence: LocalStoragePersistence,
    validation: [ClientsideValidation],
    lookup: [NullLookup],

    // Merge default components with overrides
    components: {
      ...defaultComponent,
      ...components,
    },

    // Merge the rest of the overrides
    ...otherOptions
  };

  // Wire up to RHF
  // const rform = useRippleForm({
  //   mode: 'onBlur'
  // });

  const rform = useForm<FormResponses, any>({
    mode: 'onBlur'
  });

  // Simplistic form, similar to RHF useForm()
  // Retval can be passed into a <Ripple> component for providing context.
  return {
    form,
    options: opt,
    dispatch: useDispatch,
    selector: useSelector,
    getNextPage: (page: PageName) => getNextPage(form, page),
    getPreviousPage: (page: PageName) => getPreviousPage(form, page),
    ...rform
  };
}
