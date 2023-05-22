
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { LocalStoragePersistence } from '../../providers/LocalStoragePersistence';
import { ClientsideValidation } from '../../providers/ClientsideValidation';
import { NullLookup } from '../../providers/NullLookup';

import { RippleOptions, RippleContext, useRipple } from '../../hooks';
import { FormDefinition } from '../../types';
import { store } from '../../store';
import { defaultComponent } from '../../react/mappings';

export type FormProviderProps = {
  form: FormDefinition

  options?: Partial<RippleOptions>;

  children: React.ReactNode
}

/**
 * Wraps children in the Ripple context and Redux store
 * used across Ripple components.
 */
export function FormProvider({ form, options = {}, children }: FormProviderProps) {
  const { components, ...otherOptions } = options;

  const ctx = useRipple(form, {
    components: {
      ...defaultComponent,
      ...components,
    },
    persistence: LocalStoragePersistence,
    validation: [ClientsideValidation],
    lookup: [NullLookup],
    ...otherOptions
  });

  return (
    <RippleContext.Provider value={ctx}>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </RippleContext.Provider>
  )
}
