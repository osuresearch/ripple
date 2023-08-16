import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageButton } from './PageButton';

const meta: Meta<typeof PageButton> = {
  title: 'Internal/PageButton',
  component: PageButton,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof PageButton>;

export const Next: Story = {
  args: {
    variant: 'next',
    children: 'Next page'
  }
};

export const Previous: Story = {
  args: {
    variant: 'previous',
    children: 'Previous page'
  }
};
