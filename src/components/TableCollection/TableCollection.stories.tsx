import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TableCollection } from './TableCollection';

const meta: Meta<typeof TableCollection> = {
  title: 'Collections/TableCollection',
  component: TableCollection,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof TableCollection>;

export const Example: Story = {
  args: {
    items: []
  }
};
