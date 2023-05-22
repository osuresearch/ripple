import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, Group } from '@osuresearch/ui';
import { Form } from './Form';
import { Field } from '../Field';
import { Page } from '../Page';
import { RippleOptions, useRippleContext } from '../../hooks';
import { DisclosureCollection } from '../DisclosureCollection';
import { SummarizedCollection } from '../SummarizedCollection';
import { TableCollection } from '../TableCollection';
import { Debugger } from '../Debugger';

import { SimpleForm } from '../../mocks/simple';
import tests from '../../mocks/tests';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Example: Story = {
  render: (args) => (
    <Form {...args} form={SimpleForm}>
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

      <Debugger />
      <ResetButton />
    </Form>
  ),
  args: {

  }
}

const options: Partial<RippleOptions> = {
  components: {
    TableCollection,
    SummarizedCollection,
    DisclosureCollection,
  }
};

export const KitchenSink: Story = {
  render: (args) => (
    <Form {...args} form={tests} options={options} />
  ),
  args: {

  }
}

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
