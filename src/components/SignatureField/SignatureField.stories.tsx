import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SignatureField } from './SignatureField';

const meta: Meta<typeof SignatureField> = {
  title: 'Components/SignatureField',
  component: SignatureField,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof SignatureField>;

export const Example: Story = {
  render: (args) => (
    <SignatureField {...args} />
  ),
  args: {
    name: 'exampleSignature',
    label: 'Example signature field',
    description: 'Additional descriptive text about this field',
  }
}
