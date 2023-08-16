import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InlineInstancePage } from './InlineInstancePage';
import { SimpleForm } from '../../mocks/simple';

const meta: Meta<typeof InlineInstancePage> = {
  title: 'Internal/InlineInstancePage',
  component: InlineInstancePage,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof InlineInstancePage>;

export const Example: Story = {
  args: {
    id: 'fae751da-0a62-46f2-9d3e-a7ed99fe54f3',
    name: 'foo',
    page: SimpleForm.pages.Main
  }
};
