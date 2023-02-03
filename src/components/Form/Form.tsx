import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useRipple, context, RippleOptions } from '../../hooks/useRipple';
import { useRippleContext } from '../../hooks/useRippleContext';
import { Ribbon } from '../Ribbon';
import { store } from '../../store';
import { PageRouter } from '../PageRouter';

export type FormProps = {
  form: FormDefinition;

  options?: Partial<RippleOptions>;

  /**
   * Automatically generate Page and Field components
   * based on the current form definition.
   */
  autolayout?: boolean;

  children?: React.ReactNode;
};

export function Form({ form, options, autolayout, children }: FormProps) {
  const ctx = useRipple(form, options);

  const Provider = context.Provider;

  return (
    <Provider value={ctx}>
      <ReduxProvider store={store}>
        <FormWrapper>{children}</FormWrapper>
      </ReduxProvider>
    </Provider>
  );
}

function FormWrapper({ children }: { children: React.ReactNode }) {
  const {
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields, defaultValues }
  } = useRippleContext();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Ribbon />

        <PageRouter>{children}</PageRouter>
      </form>
    </div>
  );
}
