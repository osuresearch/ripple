import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AutolayoutPage } from './AutolayoutPage';
import { Page } from '../Page';
import { SimpleForm } from '../../mocks/simple';
import { Form } from '../Form';
import { FormProvider } from '../FormProvider';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof AutolayoutPage> = {
  title: 'Components/AutolayoutPage',
  component: AutolayoutPage,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof AutolayoutPage>;

export const Example: Story = {
  render: (args) => (
    <FormProvider form={SimpleForm}>
      <AutolayoutPage {...args} name="Main"/>
    </FormProvider>
  ),
  args: {

  }
}

export const MissingDefinition: Story = {
  render: (args) => (
    <FormProvider form={SimpleForm}>
      <MemoryRouter>
        <AutolayoutPage {...args} name="BadPageName"/>
      </MemoryRouter>
    </FormProvider>
  ),
  args: {

  }
}
