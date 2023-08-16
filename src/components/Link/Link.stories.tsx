import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Navigation/Link',
  component: Link,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Example: Story = {
  args: {
    href: '/foo',
    children: 'Foo'
  }
};
