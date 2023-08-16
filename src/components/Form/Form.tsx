import React from 'react';

import { RippleOptions } from '../../hooks';
import { useRippleContext } from '../../hooks/useRippleContext';
import { FormDefinition } from '../../types';
import { FormProvider } from '../FormProvider';
import { FormRouter } from '../FormRouter';
import { TableOfContents } from '../TableOfContents';
import { MemoryRouterEditor } from '../MemoryRouterEditor';
import { Stack } from '@mui/material';

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
      <FormRouter
        renderContainer={({ children }) => (
          <Stack direction="row" gap={2}>
            <TableOfContents />
            <Stack gap={2}>
              <MemoryRouterEditor />
              {children}
            </Stack>
          </Stack>
        )}
      >
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
