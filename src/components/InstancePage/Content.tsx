import React, { useLayoutEffect } from 'react';

import { Field } from '../Field';
import { Markdown } from '../Markdown';
import { usePageContext } from '../../hooks/usePageContext';
import { PageDeepLink } from '../../react';
import { Breadcrumbs } from '../Breadcrumbs';
import { Paper, Stack, Typography } from '@mui/material';

export type ContentProps = {
  /**
   * Recursive breadcrumbs up the chain of nested instance pages.
   */
  breadcrumbs: PageDeepLink[];
};

export function Content({ breadcrumbs }: ContentProps) {
  const { name, page } = usePageContext();

  // TODO: Impl. Also requires handling bubbling up subpage errors.
  // const errors = { foo: { message: 'bar'} };
  const errors = {};

  // Focus first field OR the errors section on mount.
  useLayoutEffect(() => {
    // TODO
  }, []);

  return (
    <div>
      <Stack>
        <Breadcrumbs items={breadcrumbs} />
        <Typography variant="h2">{page.title}</Typography>
      </Stack>

      {page.description && (
        <Paper>
          <Markdown text={page.description} />
        </Paper>
      )}

      <FormErrors errorMessages={errors} />

      {/* TODO: Autolayout vs custom layout support. */}
      <Stack>
        {Object.keys(page.fields).map((fieldName) => (
          <Field key={fieldName} name={`${name}.${fieldName}`} />
        ))}
      </Stack>
    </div>
  );
}
