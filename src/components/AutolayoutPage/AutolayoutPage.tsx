import React from 'react';

import { usePageContext } from '../../hooks/usePageContext';
import { PageName } from '../../types';
import { Field } from '../Field';
import { Page } from '../Page';
import { Stack } from '@mui/material';

export type AutolayoutPageProps = {
  name: PageName;
};

function Content() {
  const { page } = usePageContext();

  return (
    <Stack gap={2}>
      {Object.keys(page.fields).map((name) => (
        <Field key={name} name={name} />
      ))}
    </Stack>
  );
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
