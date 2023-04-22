import React from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

import { ErrorBoundary } from '../ErrorBoundary';
import { useCollection } from '../../hooks/useCollection';
import { PageContext } from '../../hooks/usePageContext';
import { Content } from './Content';
import { PageDeepLink } from '../../react';
import { normalizeFieldPath } from '../../tools';
import { PageName } from '../../types';

export type InstancePageProps = {
  name: PageName;

  /**
   * Automatically generate Page and Field components
   * based on the current form definition.
   */
  autolayout?: boolean;

  /**
   * Recursive breadcrumbs up the chain of nested instance pages.
   */
  breadcrumbs: PageDeepLink[];

  children?: React.ReactNode;
};

/**
 * Used  for Collection field instances that need to be rendered as
 * a full page instead of inline within an existing page.
 *
 * `InstancePage` uses a recursive router to support nesting
 * any number of collections within collections.
 */
export function InstancePage(props: InstancePageProps) {
  const location = useLocation();
  const { fieldName } = useParams();
  if (!fieldName) {
    throw new Error('Missing fieldName');
  }

  // Full path from the root of responses.
  // e.g. `myCollection.UUID1.subCollection1.UUID2`
  const name = (props.name ? props.name + '.' : '') + fieldName;

  // Path without the UUID2 to point to this collection field as a whole
  const jsonPath = name.split('.');
  const instanceId = jsonPath.pop();
  const fullFieldPath = jsonPath.join('.');

  const { definition } = useCollection(fullFieldPath);

  const page = definition.template;
  const Provider = PageContext.Provider;

  const breadcrumbs = [...props.breadcrumbs, {
    label: page.title,
    href: normalizeFieldPath(location, name),
  }];

  // Recursive routing to this page OR subpages for nested collections
  return (
    <Provider value={{ name, page }}>
      <Routes>
        <Route path="/"
          element={<Content breadcrumbs={breadcrumbs} />}
          errorElement={<ErrorBoundary />}
        />
        <Route path=":fieldName/*"
          element={<InstancePage {...props} breadcrumbs={breadcrumbs} name={name} />}
          errorElement={<ErrorBoundary />}
        />
      </Routes>
    </Provider>
  )
}
