import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Ribbon } from './Ribbon';
import { FormProvider } from '../FormProvider';

const meta: Meta<typeof Ribbon> = {
  title: 'Components/Ribbon',
  component: Ribbon,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Ribbon>;

export const Example: Story = {
  render: () => (
    <FormProvider form={{ title: '', version: '', pages: {} }}>
      <Ribbon />
    </FormProvider>
  ),
  args: {

  }
}
