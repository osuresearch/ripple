import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Internal/PageHeader',
  component: PageHeader,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Example: Story = {
  args: {
    name: 'demo',
    page: {
      title: 'Demo',
      fields: {}
    }
  }
};
