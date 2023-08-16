import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageNotFound } from './PageNotFound';

const meta: Meta<typeof PageNotFound> = {
  title: 'Navigation/PageNotFound',
  component: PageNotFound,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof PageNotFound>;

export const Example: Story = {
  args: {}
};
