import { Code, Divider, FormErrors, Group, Heading, Stack, Text } from '@osuresearch/ui';
import { Provider as ReduxProvider } from 'react-redux';

import React, { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRipple, context, RippleOptions } from '../../hooks/useRipple';
import { useRippleContext } from '../../hooks/useRippleContext';
import { Page } from '../Page';
import { Ribbon } from '../Ribbon';
import { store } from '../../store';
import { Comments } from '../Comments';
import { TableOfContents } from '../TableOfContents';

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

function Autolayout() {
  const { form } = useRippleContext();

  return (
    <>
      {Object.keys(form.pages).map((page) => (
        <Page key={page} name={page} autolayout />
      ))}
    </>
  );
}

/**
 * Simple component-based Ripple form
 */
export function Form({ form, options, autolayout, children }: FormProps) {
  const ctx = useRipple(form, options);

  const {
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, touchedFields, defaultValues }
  } = ctx;

  const onSubmit = (data: any) => console.log(data);

  const Provider = context.Provider;

  return (
    <Provider value={ctx}>
      <ReduxProvider store={store}>
        <Ribbon />
        <Group>
          <TableOfContents />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading level={1}>{form.title}</Heading>
            <Text fs="sm" c="dark">
              Version {form.version}
            </Text>
            <Divider />

            <FormErrors errorMessages={errors} />

            {autolayout ? <Autolayout /> : children}
          </form>
          <Comments />
        </Group>
      </ReduxProvider>
    </Provider>
  );
}
