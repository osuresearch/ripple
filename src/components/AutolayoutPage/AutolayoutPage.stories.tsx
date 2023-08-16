import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AutolayoutPage } from './AutolayoutPage';

const meta: Meta<typeof AutolayoutPage> = {
  title: 'Components/AutolayoutPage',
  component: AutolayoutPage,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof AutolayoutPage>;

export const Example: Story = {
  args: {
    name: 'Page1'
  }
};

export const MissingDefinition: Story = {
  args: {
    name: 'BadPageName'
  }
};
