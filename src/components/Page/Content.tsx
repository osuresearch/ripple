import React from 'react';
import {
  FormErrors,
  HashLink,
  Heading,
  Paper,
  Stack
} from '@osuresearch/ui';

import { Field } from '../Field';
import { Markdown } from '../Markdown';
import { Pagination } from '../Pagination';
import { usePageContext } from '../../hooks/usePageContext';
import { PageDefinition } from '../../types';

export type ContentProps = {
  /**
   * Automatically generate Page and Field components
   * based on the current form definition.
   */
  autolayout?: boolean;

  children?: React.ReactNode;
};

export function Content({ autolayout, children }: ContentProps) {
  const { name, page } = usePageContext();

  // TODO: Impl. Also requires handling bubbling up subpage errors.
  // const errors = { foo: { message: 'bar'} };
  const errors = {};

  return (
    <div>
      <Heading level={2}>
        <HashLink id={'ripple-page-' + name}>{page.title}</HashLink>
      </Heading>

      {page.description && (
        <Paper p="lg" bgc="light" shadow="sm" withBorder>
          <Markdown text={page.description} />
        </Paper>
      )}

      <FormErrors errorMessages={errors} />

      <Stack align="stretch" gap="xl" py="lg">
        {autolayout && <Autolayout page={page} />}
        {!autolayout && <>{children}</>}
      </Stack>

      {/* TODO: Extract out of Page */}
      {/* <Pagination current={name} /> */}
    </div>
  )
}

function Autolayout({ page }: { page: PageDefinition }) {
  return (
    <>
      {Object.keys(page.fields).map((name) => (
        <Field key={name} name={name} />
      ))}
    </>
  );
}
