import React from 'react';
import { Alert } from '@mui/material';

import { useRippleContext } from '../../hooks/useRippleContext';
import { Conditional } from '../Conditional';
import { PageContext, usePageContext } from '../../hooks/usePageContext';
import { Debug } from '../Debug';
import { PageName } from '../../types';
import { PageHeader } from '../PageHeader';
import { Pagination } from '../Pagination';

export type PageProps = {
  name: PageName;

  withHeader?: boolean;

  children?: React.ReactNode;
};

function Content({ name, withHeader, children }: PageProps) {
  const { layoutMode } = useRippleContext();
  const { page } = usePageContext();

  // TODO: Impl. Also requires handling bubbling up subpage errors.
  // const errors = { foo: { message: 'bar'} };
  const errors = {};

  return (
    <>
      {withHeader && <PageHeader name={name} page={page} errors={errors} />}

      {children}

      {layoutMode === 'Paged' && <Pagination current={name} />}
    </>
  );
}

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
    return <Alert severity="error">Page missing from form definition: {name}</Alert>;
  }

  return (
    <PageContext.Provider value={{ name, page }}>
      <Conditional name={name} condition={page.condition}>
        <Debug>
          page.name: {name}
          {/* <DebugWrapper>
            <Chip variant="indicator" c="green">
              page.name: {name}
            </Chip>
          </DebugWrapper> */}
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
