import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { AutolayoutForm } from './AutolayoutForm';
import { TestForm } from '../../mocks/tests';

const meta: Meta<typeof AutolayoutForm> = {
  title: 'Components/AutolayoutForm',
  component: AutolayoutForm,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof AutolayoutForm>;

export const Example: Story = {
  render: (args) => (
    <AutolayoutForm {...args} form={TestForm} />
  ),
  args: {

  }
}
