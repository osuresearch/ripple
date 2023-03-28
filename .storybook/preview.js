
import React from "react";
import { useDarkMode } from "storybook-dark-mode";
import { DocsContainer } from './DocsContainer';

import { RUIProvider } from '@osuresearch/ui';
import '@osuresearch/ui/dist/index.css';
import './preview.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: "docs",
  docs: {
    // theme: themes.dark,
    container: DocsContainer,
  },
};

export const decorators = [
  (Story) => (
    <RUIProvider theme={useDarkMode() ? 'dark' : 'light'}>
      <Story />
    </RUIProvider>
  ),
];
