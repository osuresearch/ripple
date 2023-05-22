import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown',
  component: Markdown,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Markdown>;

export const Example: Story = {
  render: (args) => (
    <Markdown {...args} />
  ),
  args: {
    text: `
      # Markdown!

      The markdown component renders the \`text\` prop
      as markdown content.

      This includes:
      - lists
      - of
      - things

      *Formatted* __text__ and [links](https://github.com/osuresearch/ripple)!

      <small>Text wrapped in &lt;small&gt; will render the same as
      field description text in RUI 5 components.</small>

      <Admonition variant="note">
        RUI 5 admonitions are also supported
      </Admonition>

    `
  }
}
