import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LookupField } from './LookupField';

const meta: Meta<typeof LookupField> = {
  title: 'Components/LookupField',
  component: LookupField,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof LookupField>;

export const Example: Story = {
  render: (args) => (
    <LookupField {...args} />
  ),
  args: {
    name: 'exampleLookup',
    label: 'Example lookup field',
    description: 'Additional descriptive text about this field',
  }
}
