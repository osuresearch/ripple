import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InlineCollection } from './InlineCollection';
import { SimpleForm } from '../../mocks/simple';

const meta: Meta<typeof InlineCollection> = {
  title: 'Collections/InlineCollection',
  component: InlineCollection,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof InlineCollection>;

export const Example: Story = {
  args: {}
};
