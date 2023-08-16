import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';

import { Field } from '../Field';
import { Page } from '../Page';
import { RippleOptions, useRippleContext } from '../../hooks';
import { DisclosureCollection } from '../DisclosureCollection';
import { SummarizedCollection } from '../SummarizedCollection';
import { TableCollection } from '../TableCollection';
import { Debugger } from '../Debugger';

import { TestForm } from '../../mocks/tests';

import { Button, Stack } from '@mui/material';
import { SimpleForm } from '../../mocks/simple';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Example: Story = {
  render: (args) => (
    <Form {...args} form={TestForm}>
      <Page name="Main">
        <Stack direction="row">
          <Field name="textField1" />
          <Field name="textField1" />
          <Field name="textField2" />
        </Stack>
        <Field name="booleanField" />
        <Field name="booleanField" />
        <Field name="dateField" />
        <Field name="keyField" />
      </Page>

      <Debugger />
      <ResetButton />
    </Form>
  ),
  args: {}
};

const options: Partial<RippleOptions> = {
  components: {
    TableCollection,
    SummarizedCollection,
    DisclosureCollection
  }
};

export const KitchenSink: Story = {
  render: (args) => <Form {...args} form={SimpleForm} options={options} />,
  args: {}
};

function ResetButton() {
  const { reset } = useRippleContext();

  return (
    <Button
      onClick={() =>
        reset({
          textField1: '',
          textField2: '',
          booleanField: undefined
        })
      }
    >
      Reset
    </Button>
  );
}
