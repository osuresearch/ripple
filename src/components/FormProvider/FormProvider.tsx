
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { RippleOptions, RippleContext, useRipple } from '../../hooks';
import { FormDefinition } from '../../types';
import { store } from '../../store';

export type FormProviderProps = {
  form: FormDefinition

  options?: Partial<RippleOptions>;

  children: React.ReactNode
}

/**
 * Wraps children in the Ripple context and Redux store
 * used across Ripple components.
 */
export function FormProvider({ form, options, children }: FormProviderProps) {
  const ctx = useRipple(form, options);

  return (
    <RippleContext.Provider value={ctx}>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </RippleContext.Provider>
  )
}
