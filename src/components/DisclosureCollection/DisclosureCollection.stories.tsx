import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DisclosureCollection } from './DisclosureCollection';
import { Page } from '../Page';
import { FormDefinition } from '../../types';
import { Form } from '../Form';

const meta: Meta<typeof DisclosureCollection> = {
  title: 'Components/DisclosureCollection',
  component: DisclosureCollection,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DisclosureCollection>;

const form = {
  title: 'Simple test form',
  version: '1.0',
  pages: {
    root: {
      title: 'Root',
      fields: {
        testCollection: {
          type: 'Collection',
          label: 'Test collection',
          template: {
            title: 'Test collection template',
            fields: {
              field1: {
                type: 'Text',
                label: 'Field 1',
              },
              field2: {
                type: 'Text',
                label: 'Field 2',
              },
            }
          }
        }
      }
    }
  }
} as const satisfies FormDefinition;

export const Example: Story = {
  render: (args) => (
    <Form form={form}>
      <Page name="root">
        <DisclosureCollection {...args} />
      </Page>
    </Form>
  ),
  args: {
    name: 'example',
    placeholder: 'There is nothing here!',
  }
}
