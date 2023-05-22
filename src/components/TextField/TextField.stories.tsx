import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Example: Story = {
  render: (args) => (
    <TextField {...args} />
  ),
  args: {
    name: 'exampleText',
    label: 'Example text field',
    description: 'Additional descriptive text about this field',
  }
}

export const WithCharacterLimit: Story = {
  render: (args) => (
    <TextField {...args} />
  ),
  args: {
    name: 'exampleText',
    label: 'Example text field limited to 500 (visible) characters',
    height: 3,
    limit: 500,
  }
}

export const WithNoNewline: Story = {
  render: (args) => (
    <TextField {...args} />
  ),
  args: {
    name: 'exampleText',
    label: 'Example text field with a single line height and disabled newlines',
    description: 'Do note that text entry will still wrap rather than overflow scroll',
    noNewline: true,
    height: 1,
  }
}
