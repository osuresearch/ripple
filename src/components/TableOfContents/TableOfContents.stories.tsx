import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from './TableOfContents';

const meta: Meta<typeof TableOfContents> = {
  title: 'Navigation/TableOfContents',
  component: TableOfContents,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Example: Story = {
  args: {}
};
