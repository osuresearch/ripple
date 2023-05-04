import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useRipple, RippleContext, RippleOptions } from '../../hooks';
import { useRippleContext } from '../../hooks/useRippleContext';
import { Ribbon } from '../Ribbon';
import { store } from '../../store';
import { PageRouter } from '../PageRouter';
import { FormDefinition } from '../../types';
import { FormProvider } from '../FormProvider';

export type FormProps = {
  form: FormDefinition;

  options?: Partial<RippleOptions>;

  children?: React.ReactNode;
};

function FormWrapper({ children }: { children: React.ReactNode }) {
  const {
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields, defaultValues }
  } = useRippleContext();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Ribbon />

      <PageRouter>{children}</PageRouter>
    </form>
  );
}

export function Form({ children, ...providerProps }: FormProps) {
  return (
    <FormProvider {...providerProps}>
      <FormWrapper>{children}</FormWrapper>
    </FormProvider>
  );
}
