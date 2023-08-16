export const parameters = {
  actions: {
    argTypesRegex: '^on(Focus|Blur|Press|Click)'
  }
};
import React from 'react';
import { Preview } from '@storybook/react';
import { RUIProvider } from '@osuresearch/ui';

import { FormProvider } from '../src/components/FormProvider';
import { TestForm } from '../src/mocks/tests';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Getting Started', 'Components', 'Fields', 'Collections', 'Navigation', 'Internal']
      }
    }
  },
  decorators: [
    // All stories need an RUI provider and a mock form
    (Story) => (
      <RUIProvider>
        <FormProvider form={TestForm}>
          <Story />
        </FormProvider>
      </RUIProvider>
    )
  ]
};

export default preview;
