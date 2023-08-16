import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';

const meta: Meta<typeof Page> = {
  title: 'Components/Page',
  component: Page,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Example: Story = {
  args: {
    name: 'Page1'
  }
};
