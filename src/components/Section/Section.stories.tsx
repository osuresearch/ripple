import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Example: Story = {
  render: (args) => (
    <Section {...args} />
  ),
  args: {
    name: '_exampleSection',
    label: 'Example section',
    description: 'Additional optional details about this section',
  }
}
