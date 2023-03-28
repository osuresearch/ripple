import {
  Alert,
  Box,
  Chip,
  DocumentPagination,
  Group,
  HashLink,
  Heading,
  Icon,
  Link,
  Paper,
  Stack,
  Text
} from '@osuresearch/ui';

import React, { createContext, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useRipple } from '../../hooks/useRipple';
import { useRippleContext } from '../../hooks/useRippleContext';
import { Conditional } from '../Conditional';
import { Field } from '../Field';
import { Markdown } from '../Markdown';

export type PageProps = {
  name: PageName;

  /**
   * Automatically generate Page and Field components
   * based on the current form definition.
   */
  autolayout?: boolean;

  children?: React.ReactNode;
};

export type PageContext = {
  name: PageName;
  page: PageDefinition;
};

export const context = createContext<PageContext>({} as PageContext);

/**
 *
 */
export function Page({ name, autolayout = false, children }: PageProps) {
  const { form, reset, getPreviousPage, getNextPage, getValues } = useRippleContext();

  // load this page's responses into RHF
  // if there's fields we don't have yet, load 'em
  // (might be done at the field level though)
  // alternatively, if we don't have this page's definitions AT ALL, load.

  // sum up errors for all fields on this page
  // handle all the magic custom rendering / auto rendering / etc.

  // This can be undefined if someone input an invalid page name.
  const page = form.pages[name];

  // default'n
  useEffect(() => {
    if (!page) {
      return;
    }

    reset(
      {
        ...getValues(),

        // Reset the entire page state to unanswered but load
        // keys in RHF so we can iterate on them for conditions.
        ...Object.keys(page.fields).reduce(
          (agg, name) => ((agg[name] = null), agg),
          {} as Record<string, any>
        )
      },
      {
        keepErrors: true,
        keepDirty: true
      }
    );
  }, []);

  const Provider = context.Provider;

  if (!page) {
    return (
      <Alert variant="error" title="Page not found">
        Page missing from form definition: {name}
      </Alert>
    );
  }

  const prev = getPreviousPage(name);
  const next = getNextPage(name);

  return (
    <Provider value={{ name, page }}>
      <Conditional name={name} condition={page.condition}>
        <Heading level={2}>
          <HashLink id={'ripple-page-' + name}>{page.title}</HashLink>
        </Heading>

        <Chip variant="outline" c="pink">page.name: {name}</Chip>

        {page.description && (
          <Paper p="lg" bgc="light" shadow="sm" withBorder>
            <Markdown text={page.description} />
          </Paper>
        )}

        <Stack align="stretch" gap="xl" py="lg">
          {autolayout && <Autolayout page={page} />}
          {!autolayout && <>{children}</>}
        </Stack>

        <Group justify="apart">
          {!prev && (
            <DocumentPagination as={RouterLink} to="/" direction="previous">
              Home
            </DocumentPagination>
          )}

          {prev && (
            <DocumentPagination as={RouterLink} to={'/page/' + prev.name} direction="previous">
              {prev.definition.title}
            </DocumentPagination>
          )}

          {next && (
            <DocumentPagination as={RouterLink} to={'/page/' + next.name} direction="next">
              {next.definition.title}
            </DocumentPagination>
          )}

          {!next && (
            <DocumentPagination as={RouterLink} to="/submit" direction="next">
              Review &amp; Submit
            </DocumentPagination>
          )}
        </Group>
      </Conditional>
    </Provider>
  );
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
