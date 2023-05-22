import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { FormProvider } from '../FormProvider';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Example: Story = {
  render: (args) => (
    <FormProvider form={{ title: '', version: '', pages: {} }}>
      <MemoryRouter>
        <Breadcrumbs {...args} />
      </MemoryRouter>
    </FormProvider>
  ),
  args: {
    items: [
      {
        label: 'Foo',
        href: '/foo',
      },
      {
        label: 'Subpage of Foo',
        href: '/foo/subpage',
      },
      {
        label: 'A third level',
        href: '/foo/subpage/lvl3',
      }
    ]
  }
}
