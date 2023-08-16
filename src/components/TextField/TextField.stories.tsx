import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Fields/TextField',
  component: TextField,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Example: Story = {
  args: {
    name: 'exampleText',
    label: 'Example text field',
    description: 'Additional descriptive text about this field'
  }
};

export const WithCharacterLimit: Story = {
  args: {
    name: 'exampleText',
    label: 'Example text field limited to 100 (visible) characters',
    height: 3,
    limit: 100
  }
};

export const WithNoNewline: Story = {
  args: {
    name: 'exampleText',
    label: 'Example text field with a single line height and disabled newlines',
    description: 'Do note that text entry will still wrap rather than overflow scroll',
    noNewline: true,
    height: 1
  }
};
