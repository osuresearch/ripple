import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormRouter } from './FormRouter';

const meta: Meta<typeof FormRouter> = {
  title: 'Navigation/FormRouter',
  component: FormRouter,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof FormRouter>;

export const Example: Story = {
  args: {}
};
