import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AttachmentsField } from './AttachmentsField';

const meta: Meta<typeof AttachmentsField> = {
  title: 'Fields/AttachmentsField',
  component: AttachmentsField,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof AttachmentsField>;

export const Example: Story = {
  args: {
    name: 'exampleAttachments',
    label: 'Example attachments field',
    description: 'Additional descriptive text about this field'
  }
};
