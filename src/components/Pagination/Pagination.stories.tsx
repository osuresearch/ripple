import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Example: Story = {
  args: {}
};
