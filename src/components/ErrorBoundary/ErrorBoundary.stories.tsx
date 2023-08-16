import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Navigation/ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Example: Story = {
  args: {}
};
