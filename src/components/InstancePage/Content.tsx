import React, { useEffect, useLayoutEffect } from 'react';
import {
  FormErrors,
  Group,
  Heading,
  Paper,
  Stack,
  Text
} from '@osuresearch/ui';

import { Field } from '../Field';
import { Markdown } from '../Markdown';
import { usePageContext } from '../../hooks/usePageContext';
import { PageDeepLink } from '../../react';
import { Breadcrumbs } from '../Breadcrumbs';

export type ContentProps = {
  /**
   * Recursive breadcrumbs up the chain of nested instance pages.
   */
  breadcrumbs: PageDeepLink[];
}

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
        <Heading level={2}>{page.title}</Heading>
      </Stack>

      {page.description && (
        <Paper p="lg" bgc="light" shadow="sm" withBorder>
          <Markdown text={page.description} />
        </Paper>
      )}

      <FormErrors errorMessages={errors} />

      {/* TODO: Autolayout vs custom layout support. */}
      <Stack align="stretch" gap="xl" py="lg">
        {Object.keys(page.fields).map((fieldName) => (
          <Field key={fieldName} name={`${name}.${fieldName}`} />
        ))}
      </Stack>

    </div>
  )
}
