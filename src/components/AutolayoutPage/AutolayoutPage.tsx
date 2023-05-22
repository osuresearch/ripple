
import React from 'react';
import {
  Stack
} from '@osuresearch/ui';

import { usePageContext } from '../../hooks/usePageContext';
import { PageName } from '../../types';
import { Field } from '../Field';
import { Page } from '../Page';

export type AutolayoutPageProps = {
  name: PageName;
};

function Content() {
  const { page } = usePageContext();

  return (
    <Stack align="stretch" gap="xl" py="lg">
      {Object.keys(page.fields).map((name) => (
        <Field key={name} name={name} />
      ))}
    </Stack>
  )
}

/**
 *
 *
 */
export function AutolayoutPage({ name }: AutolayoutPageProps) {
  return (
    <Page name={name} withHeader>
      <Content />
    </Page>
  );
}
