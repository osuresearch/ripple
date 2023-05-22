import {
  Alert,
  Chip,
  Stack
} from '@osuresearch/ui';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { useRippleContext } from '../../hooks/useRippleContext';
import { Conditional } from '../Conditional';
import { ErrorBoundary } from '../ErrorBoundary';
import { PageContext, usePageContext } from '../../hooks/usePageContext';
import { InstancePage } from '../InstancePage';
import { Debug } from '../Debug';
import { PageName } from '../../types';
import { PageHeader } from '../PageHeader';
import { Field } from '../Field';
import { Pagination } from '../Pagination';

export type PageProps = {
  name: PageName;

  withHeader?: boolean;

  children?: React.ReactNode;
};

function Content({ name, withHeader, children }: PageProps) {
  const { page } = usePageContext();

  // TODO: Impl. Also requires handling bubbling up subpage errors.
  // const errors = { foo: { message: 'bar'} };
  const errors = {};

  return (
    <>
      {withHeader &&
        <PageHeader name={name} page={page} errors={errors} />
      }

      {children}

      <Pagination current={name} />
    </>
  )
}

const DebugWrapper = styled.div`
  position: absolute;
  left: calc(100% - 30px);
  white-space: nowrap;
`

/**
 * A page provides context for all child fields and handles
 * automatic layout rendering if `autolayout` is specified.
 *
 * Pages control routing for nested collection fields that
 * are displayed as sub-pages.
 *
 * Includes route paths:
 * - `/`: The current page
 * - `:fieldName/*`: A collection instance sub-page
 */
export function Page(props: PageProps) {
  const { form } = useRippleContext();
  const { name } = props;

  const page = form.pages[name];
  if (!page) {
    return (
      <Alert variant="error" title="Page not found">
        Page missing from form definition: {name}
      </Alert>
    );
  }

  return (
    <PageContext.Provider value={{ name, page }}>
      <Conditional name={name} condition={page.condition}>
        <Debug>
          <DebugWrapper>
            <Chip variant="indicator" c="green">page.name: {name}</Chip>
          </DebugWrapper>
        </Debug>

        <Content {...props} />
        {/* Disabled for now - issue with accessing this router state from outside the package.  */}

        {/* Routing to either subpages (for collection instances) or content for *this* page */}
        {/* <Routes>
          <Route path="/"
            element={<Content {...props} />}
            errorElement={<ErrorBoundary />}
          />
          <Route path=":fieldName/*"
            element={<InstancePage breadcrumbs={[{ label: page.title, href: `/page/${name}` }]} {...props} name="" />}
            errorElement={<ErrorBoundary />}
          />
        </Routes> */}
      </Conditional>
    </PageContext.Provider>
  );
}
