import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InstanceSummary } from './InstanceSummary';

const meta: Meta<typeof InstanceSummary> = {
  title: 'Internal/InstanceSummary',
  component: InstanceSummary,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof InstanceSummary>;

export const Example: Story = {
  args: {
    id: '1234',
    definition: {
      type: 'Collection',
      label: 'Example field',
      template: {
        title: 'Collection template',
        fields: {}
      }
    },
    responses: {
      foo: 'bar'
    }
  }
};
