import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SubmitButton } from './SubmitButton';

const meta: Meta<typeof SubmitButton> = {
  title: 'Navigation/SubmitButton',
  component: SubmitButton,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof SubmitButton>;

export const Example: Story = {
  args: {}
};
