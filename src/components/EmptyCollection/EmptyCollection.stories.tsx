import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { EmptyCollection } from './EmptyCollection';

const meta: Meta<typeof EmptyCollection> = {
  title: 'Collections/EmptyCollection',
  component: EmptyCollection,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof EmptyCollection>;

export const Example: Story = {
  render: (args) => <EmptyCollection {...args} />,
  args: {
    placeholder: 'There is nothing here!'
  }
};
