import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouterEditor } from './MemoryRouterEditor';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof MemoryRouterEditor> = {
  title: 'Internal/MemoryRouterEditor',
  component: MemoryRouterEditor,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof MemoryRouterEditor>;

export const Example: Story = {
  render: () => (
    <MemoryRouter>
      <MemoryRouterEditor />
    </MemoryRouter>
  ),
  args: {}
};
