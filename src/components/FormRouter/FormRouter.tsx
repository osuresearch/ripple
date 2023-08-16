import React, { Fragment } from 'react';
import {
  Routes,
  Route,
  RouterProvider,
  RouteObject,
  Outlet,
  createMemoryRouter,
  createHashRouter
} from 'react-router-dom';

import { useRippleContext, useRippleSelector } from '../../hooks';
import { ErrorBoundary } from '../ErrorBoundary';
import { PageNotFound } from '../PageNotFound';
import { PageProps } from '../Page';
import { AutolayoutPage, AutolayoutPageProps } from '../AutolayoutPage';
import { getCollectionFields } from '../../tools';
import { PageDefinition } from '../../types';
import { Content } from '../Content';

export interface FormContainerProps {
  pageName?: string;
}

export type FormRouterProps = {
  children?: React.ReactNode;

  /**
   * Container element around all pages
   */
  renderContainer?: (props: { children: React.ReactNode }) => React.ReactNode;
};

function WrappedFormRouter({ children }: FormRouterProps) {
  const { form } = useRippleContext();

  const layoutMode = useRippleSelector((state) => state.settings.layoutMode);

  const pages: Record<string, React.ReactNode> = {};

  // Pages that exist as children to the form are explicitly laid out
  // by developers to include custom props or DOM.
  React.Children.forEach(children, (child) => {
    const isPage = React.isValidElement<PageProps>(child) && child.type === 'page';
    const isAutolayoutPage =
      React.isValidElement<AutolayoutPageProps>(child) && child.type === 'autolayoutpage';
    if (isPage || isAutolayoutPage) {
      pages[child.props.name] = child;
    }
  });

  // Anything that isn't explicitly declared by the developer but *does*
  // exist on the form - we autogenerate a page with its content.
  Object.keys(form.pages).forEach((name) => {
    if (!(name in pages)) {
      pages[name] = <AutolayoutPage key={name} name={name} />;
    }
  });

  // TODO: Memory router is just for storybook testing.
  // We won't be using this in production.
  // const router = createMemoryRouter(routes, {
  //   initialEntries: ['/'],
  //   initialIndex: 0,
  // });

  // TODO: Switch over to data API
  // See: https://reactrouter.com/en/main/routers/picking-a-router

  // const routes: RouteObject[] = [
  //   {
  //     path: '/',
  //     element: <RootRoute />,
  //     children: Object.keys(pages).map((name) => ({
  //       path: 'page/' + name,
  //       element: pages[name],
  //     })),
  //     errorElement: <ErrorBoundary />
  //   }
  // ];

  // Single page mode
  if (layoutMode === 'Single') {
    return (
      <Routes>
        <Route path="/" element={<Content />} errorElement={<ErrorBoundary />}>
          <Route
            path="page/:name"
            element={
              <Fragment>
                {Object.keys(pages).map((name) => (
                  <Fragment key={name}>{pages[name]}</Fragment>
                ))}
              </Fragment>
            }
          />
        </Route>
      </Routes>
    );
  }

  // Multipage
  return (
    <Routes>
      <Route path="/" element={<Content />} errorElement={<ErrorBoundary />}>
        {Object.keys(pages).map((name) => (
          <Route key={name} path={`page/${name}/*`} element={pages[name]} />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

/**
 * Recursive function to convert all nested collection fields
 * into nested RouteObjects and instance renderers for React Router.
 */
function addChildCollectionRoutes(page?: PageDefinition): RouteObject[] {
  if (!page) {
    return [];
  }

  return getCollectionFields(page).map((name) => ({
    path: name,
    element: <div>TODO: instance of {name}</div>,
    children: addChildCollectionRoutes(page.fields[name].template)
  }));
}

/**
 * Dynamic React Router memory router that configures itself to
 * match the active form definition.
 */
export function FormRouter({ children, renderContainer }: FormRouterProps) {
  const { form } = useRippleContext();

  const pageNames = Object.keys(form.pages);

  // Pages that exist as children to the form are explicitly laid out
  // by developers to include custom props or DOM.
  const overrides: Record<string, React.ReactNode> = {};

  React.Children.forEach(children, (child) => {
    const isPage = React.isValidElement<PageProps>(child) && child.type === 'page';
    const isAutolayoutPage =
      React.isValidElement<AutolayoutPageProps>(child) && child.type === 'autolayoutpage';
    if (isPage || isAutolayoutPage) {
      overrides[child.props.name] = child;
    }
  });

  // Anything that isn't explicitly declared by the developer but *does*
  // exist on the form - we autogenerate a page with its content.

  const routes: RouteObject[] = [];

  pageNames.forEach((name) => {
    routes.push({
      path: name,
      element: name in overrides ? overrides[name] : <AutolayoutPage name={name} />,
      children: addChildCollectionRoutes(form.pages[name])
    });
  });

  // First page is synonymous with the root path
  routes.push({
    ...routes[0],
    path: ''
  });

  const router = createHashRouter([
    {
      path: '/',
      errorElement: <ErrorBoundary />,
      element: (
        <div>{renderContainer ? renderContainer({ children: <Outlet /> }) : <Outlet />}</div>
      ),
      children: routes
    }
  ]);

  return <RouterProvider router={router} />;
}
