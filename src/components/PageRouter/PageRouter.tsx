import React, { Fragment } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useRippleContext } from '../../hooks';
import { Content } from '../Content';
import { ErrorBoundary } from '../ErrorBoundary';
import { PageNotFound } from '../PageNotFound';
import { PageProps, Page } from '../Page';

export type PageRouterProps = {
  children: React.ReactNode;
};

export function PageRouter({ children }: PageRouterProps) {
  const { form, selector } = useRippleContext();

  const layoutMode = selector((state) => state.settings.layoutMode);

  const pages: Record<string, React.ReactNode> = {};

  // Pages that exist as children to the form are explicitly laid out
  // by developers to include custom props or DOM.
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<PageProps>(child) && child.type === 'page') {
      pages[child.props.name] = child;
    }
  });

  // Anything that isn't explicitly declared by the developer but *does*
  // exist on the form - we autogenerate a page with its content.
  Object.keys(form.pages).forEach((name) => {
    if (!(name in pages)) {
      pages[name] = <Page key={name} name={name} autolayout />;
    }
  });

  // TODO: Memory router is just for storybook testing.
  // We won't be using this in production.
  // const router = createMemoryRouter(routes, {
  //   initialEntries: ['/'],
  //   initialIndex: 0,
  // });

  // TODO: Collection templates e.g. `form.pages.devices.0.companies.1.fields`.
  // Right now they're rendered inline so it's a NBD but I can
  // see use cases where we'd want to deep link.

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

  return (
    /* <RouterProvider router={router} /> */
    <MemoryRouter>
      {layoutMode === 'Paged' && (
        <Routes>
          <Route path="/" element={<Content />} errorElement={<ErrorBoundary />}>
            {Object.keys(pages).map((name) => (
              <Route key={name} path={`page/${name}/*`} element={pages[name]} />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      )}

      {layoutMode === 'Single' && (
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
      )}
    </MemoryRouter>
  );
}
