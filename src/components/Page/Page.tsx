import {
  Alert,
  Chip
} from '@osuresearch/ui';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { useRippleContext } from '../../hooks/useRippleContext';
import { Conditional } from '../Conditional';
import { ErrorBoundary } from '../ErrorBoundary';
import { PageContext } from '../../hooks/usePageContext';
import { InstancePage } from '../InstancePage';
import { Content } from './Content';
import { Debug } from '../Debug';
import { PageName } from '../../types';

export type PageProps = {
  name: PageName;

  /**
   * Automatically generate Page and Field components
   * based on the current form definition.
   */
  autolayout?: boolean;

  children?: React.ReactNode;
};

const DebugWrapper = styled.div`
  position: absolute;
  left: calc(100% - 30px);
  white-space: nowrap;
`

export function Page(props: PageProps) {
  const { form } = useRippleContext();

  const name = props.name;
  const Provider = PageContext.Provider;

  const page = form.pages[name];
  if (!page) {
    return (
      <Alert variant="error" title="Page not found">
        Page missing from form definition: {name}
      </Alert>
    );
  }

  return (
    <Provider value={{ name, page }}>
      <Conditional name={name} condition={page.condition}>
        <Debug>
          <DebugWrapper>
            <Chip variant="indicator" c="green">page.name: {name}</Chip>
          </DebugWrapper>
        </Debug>

        {/* Routing to either subpages (for collection instances) or content for *this* page */}
        <Routes>
          <Route path="/"
            element={<Content {...props} />}
            errorElement={<ErrorBoundary />}
          />
          <Route path=":fieldName/*"
            element={<InstancePage breadcrumbs={[{ label: page.title, href: `/page/${name}` }]} {...props} name="" />}
            errorElement={<ErrorBoundary />}
          />
        </Routes>
      </Conditional>
    </Provider>
  );
}
