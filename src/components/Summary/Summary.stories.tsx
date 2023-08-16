import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Summary } from './Summary';

const meta: Meta<typeof Summary> = {
  title: 'Components/Summary',
  component: Summary,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Summary>;

export const Example: Story = {
  args: {}
};
