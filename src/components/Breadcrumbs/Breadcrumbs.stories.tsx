import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';
import { FormProvider } from '../FormProvider';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Example: Story = {
  render: (args) => (
    <MemoryRouter>
      <Breadcrumbs {...args} />
    </MemoryRouter>
  ),
  args: {
    items: [
      {
        label: 'Foo',
        href: '/foo'
      },
      {
        label: 'Subpage of Foo',
        href: '/foo/subpage'
      },
      {
        label: 'A third level',
        href: '/foo/subpage/lvl3'
      }
    ]
  }
};
