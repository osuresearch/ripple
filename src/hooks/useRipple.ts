import { createContext, useState } from 'react';
import { FieldComponentType } from '../react';
import { getNextPage, getPreviousPage } from '../tools';
import { RipplePersistenceProvider, RippleLookupProvider, RippleValidationProvider, FormDefinition, PageName, PageDefinition, FormResponses, InteractionMode } from '../types';
import { UseFormReturn, useForm } from 'react-hook-form';

export type RippleOptions = {

  /**
   * Initial interaction mode for the form
   */
  interactionMode: InteractionMode

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

  interactionMode: InteractionMode;
  setInteractionMode: (mode: InteractionMode) => void;

} & UseFormReturn<FormResponses, any>;

export type UseRippleReturn<T extends FormDefinition> = IRippleContext;

export const RippleContext = createContext<IRippleContext>({} as IRippleContext);

export function useRipple<T extends FormDefinition>(
  form: T,
  options: RippleOptions
): UseRippleReturn<T> {
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(options.interactionMode);

  const rform = useForm<FormResponses, any>({
    mode: 'onBlur'
  });

  // Simplistic form, similar to RHF useForm()
  // Retval can be passed into a <Ripple> component for providing context.
  return {
    form,
    options,

    getNextPage: (page: PageName) => getNextPage(form, page),
    getPreviousPage: (page: PageName) => getPreviousPage(form, page),

    interactionMode,
    setInteractionMode,

    ...rform
  };
}
