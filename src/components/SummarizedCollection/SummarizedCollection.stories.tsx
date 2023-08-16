import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SummarizedCollection } from './SummarizedCollection';

const meta: Meta<typeof SummarizedCollection> = {
  title: 'Collections/SummarizedCollection',
  component: SummarizedCollection,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof SummarizedCollection>;

export const Example: Story = {
  args: {}
};
