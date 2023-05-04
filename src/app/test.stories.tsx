import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import tests from './forms/tests';
import simple from './forms/simple';

import { Form } from '../components/Form';
import { TableCollection } from '../components/TableCollection';
import { SummarizedCollection } from '../components/SummarizedCollection';
import { DisclosureCollection } from '../components/DisclosureCollection';
import { RippleOptions, useRippleContext } from '../hooks';
import { FormProvider } from '../components/FormProvider';
import { Page } from '../components/Page';
import { PageRouter } from '../components/PageRouter';
import { Field } from '../components/Field';
import { Button, Group } from '@osuresearch/ui';
import { Debugger } from '../components/Debugger';

export default {
  title: 'Demos / Tests',
};

const options: Partial<RippleOptions> = {
  components: {
    TableCollection,
    SummarizedCollection,
    DisclosureCollection,
  }
};

export const Tests = () => <>
  <Form form={tests} options={options} />
</>

function ResetButton() {
  const { reset } = useRippleContext();

  return (
    <Button onPress={() => reset({
      textField1: '',
      textField2: '',
      booleanField: undefined,
    })}>Reset</Button>
  )
}

export const ManualLayout = () => (
  <FormProvider form={simple} options={options}>
    <Page name="Main">
      <Group grow>
        <Field name="textField1" />
        <Field name="textField1" />
        <Field name="textField2" />
      </Group>
      <Field name="booleanField" />
      <Field name="booleanField" />
      <Field name="dateField" />
      <Field name="keyField" />
    </Page>

    <Page name="Shipping">
      <Group grow>
        <Field name="foo" />
        <Field name="bar" />
      </Group>
    </Page>

    <Debugger />
    {/* <Page name="Main" autolayout /> */}
    <ResetButton />
  </FormProvider>
)
