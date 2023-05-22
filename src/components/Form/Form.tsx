import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useRipple, RippleContext, RippleOptions } from '../../hooks';
import { useRippleContext } from '../../hooks/useRippleContext';
import { Ribbon } from '../Ribbon';
import { FormDefinition } from '../../types';
import { FormProvider } from '../FormProvider';
import { FormRouter } from '../FormRouter';
import { TableOfContents } from '../TableOfContents';
import { Group, Stack } from '@osuresearch/ui';
import { MemoryRouterEditor } from '../MemoryRouterEditor';

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
      <FormRouter renderContainer={({ children }) =>
        <Group>
          <TableOfContents />
          <Stack>
            <MemoryRouterEditor />
            {children}
          </Stack>
        </Group>
      }>
        {children}
      </FormRouter>
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
