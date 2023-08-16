import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InstancePage } from './InstancePage';

const meta: Meta<typeof InstancePage> = {
  title: 'Internal/InstancePage',
  component: InstancePage,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof InstancePage>;

export const Example: Story = {
  args: {
    name: 'Demo page',
    breadcrumbs: [
      {
        href: '/foo',
        label: 'Foo'
      }
    ]
  }
};
