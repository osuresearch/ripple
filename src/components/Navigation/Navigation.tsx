import { Box, FocusRing, Stack, Divider, Link } from '@osuresearch/ui';
import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { useRippleContext } from '../../hooks';
import { Conditional } from '../Conditional';
import { Debugger } from '../Debugger';

type PageNavLinkProps = {
  name: PageName;
  children?: React.ReactNode;
};

function PageNavLink({ name, children }: PageNavLinkProps) {
  const activeStyle: CSSProperties = {
    border: '1px solid red'
  };

  const { form } = useRippleContext();

  const definition = form.pages[name];

  if (!definition) {
    return (
      <Box bgc="error" c="error-contrast" p="xs">
        Missing page &apos;{name}&apos;
      </Box>
    );
  }

  // Can't use link as - navlink doesn't use the same className
  // or style props and I can't hand down callables. Annoying.
  // Will just need to style it myself I guess.

  // <Link as={NavLink} className="hi" to={to}>
  //   {({ isActive }) => <></>}
  // </Link>

  // TODO: I actually don't like their navigation style. I'd rather be able
  // to control navigation with arrow keys and all that.
  return (
    <Conditional name={name} condition={definition.condition}>
      <FocusRing>
        <NavLink to={'page/' + name}>
          {({ isActive }) => (
            <>
              {definition.title}
              {children}
              {isActive ? ' 😎' : ''}
            </>
          )}
        </NavLink>
      </FocusRing>
    </Conditional>
  );
}

type CustomNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

function CustomNavLink({ to, children }: CustomNavLinkProps) {
  return (
    <FocusRing>
      <NavLink to={to}>
        {({ isActive }) => (
          <>
            {children} {isActive ? ' 😎' : ''}
          </>
        )}
      </NavLink>
    </FocusRing>
  );
}

export function Navigation() {
  const { selector, form } = useRippleContext();

  const showNavigation = selector((state) => state.settings.showNavigation);
  const showDebugger = selector((state) => state.settings.showDebugger);
  const layoutMode = selector((state) => state.settings.layoutMode);

  // Debug view is priority
  if (showDebugger) {
    return <Debugger />;
  }

  if (!showNavigation) {
    return null;
  }

  // Link behaviour changes based on layout mode.
  // If we're on a single page, each link will jump to
  // the heading of the appropriate section.

  // Paged navigation uses React Router routing.

  // Paged navigation uses React Router to change the current page.
  if (layoutMode === 'Paged') {
    return (
      <Stack miw={300}>
        <CustomNavLink to="/">Home</CustomNavLink>
        <Divider orientation="horizontal" />

        {Object.keys(form.pages).map((name) => (
          <PageNavLink key={name} name={name} />
        ))}

        <Divider orientation="horizontal" />
        <CustomNavLink to="/submit">Submit</CustomNavLink>
      </Stack>
    );
  }

  // Single page navigation will scroll the document to the
  // target page heading.
  if (layoutMode === 'Single') {
    return (
      <Stack miw={300}>
        TODO: Single page navigation links.
        {Object.keys(form.pages).map((name) => (
          <Link key={name} href={'#ripple-page-' + name}>
            {form.pages[name].title}
          </Link>
        ))}
      </Stack>
    );
  }

  throw new Error('Unhandled layout mode: ' + layoutMode);
}
