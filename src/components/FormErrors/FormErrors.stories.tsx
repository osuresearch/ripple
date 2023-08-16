import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormErrors } from './FormErrors';

const meta: Meta<typeof FormErrors> = {
  title: 'Navigation/FormErrors',
  component: FormErrors,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof FormErrors>;

export const Example: Story = {
  args: {
    errorMessages: {
      foo: {
        message: 'You must fill out the foo field'
      },
      bar: {
        message: 'You must fill out the bar field'
      },
      date: {
        message: 'The date you selected must be between January and December'
      }
    }
  }
};
