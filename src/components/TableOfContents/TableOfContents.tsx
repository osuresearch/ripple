import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useRippleSelector, useRippleContext, useCondition } from '../../hooks';
import { PageName } from '../../types';
import { Box, IconButton, Link, Stack, Tooltip, Typography, styled } from '@mui/material';
import { ScrollArea } from '../ScrollArea';
import { Icon } from '@osuresearch/ui';

// const StyledNavLink = styled.div<{ isActive: boolean; isHidden: boolean }>`
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
//   padding-left: 4px;
//   margin-left: -4px;

//   color: ${(props) =>
//     props.isHidden
//       ? 'var(--rui-dark)'
//       : props.isActive
//       ? 'var(--rui-primary)'
//       : 'var(--rui-light-contrast)'};

//   box-shadow: ${(props) => (props.isActive ? '-4px 0px 0px 0px var(--rui-primary)' : 'none')};
// `;

const StyledNavLink = styled('div')<{ isActive: boolean; isHidden: boolean }>(
  ({ theme, isActive, isHidden }) => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingLeft: 4,
    marginLeft: -4,
    color: isHidden
      ? theme.palette.text.disabled
      : isActive
      ? theme.palette.primary.main
      : theme.palette.text.primary,
    boxShadow: isActive ? `-4px 0 0 0 ${theme.palette.primary.main}` : 'none'
  })
);

type PageNavLinkProps = {
  name: PageName;
  children?: React.ReactNode;
};

function PageNavLink({ name, children }: PageNavLinkProps) {
  const { form } = useRippleContext();
  const definition = form.pages[name];

  const showConditions = useRippleSelector((state) => state.settings.showConditions);

  const { passed, error, fields, references } = useCondition(definition.condition);

  if (!definition) {
    return <Box sx={{ background: 'error.main' }}>Missing page &apos;{name}&apos;</Box>;
  }

  if (!showConditions && !passed) {
    return null;
  }

  return (
    <Stack width={300} justifyContent="space-between">
      <NavLink to={name} style={{ maxWidth: 250, textDecoration: 'none' }}>
        {({ isActive }) => (
          <StyledNavLink isActive={isActive} isHidden={!passed}>
            {definition.title} {children}
          </StyledNavLink>
        )}
      </NavLink>

      {showConditions && definition.condition && (
        <Tooltip arrow title="This page is conditionally displayed">
          <NavLink to={name}>
            <Icon size={20} name={passed ? 'eye' : 'eyeSlash'} aria-label="Conditional" />
          </NavLink>
        </Tooltip>
      )}

      {/* TODO: Error indicator  */}
      {/* {!showConditions &&
          <Icon name="exclamationFill" c="error" aria-label="Errors" />
        } */}
    </Stack>
  );
}

export function TableOfContents() {
  const { form } = useRippleContext();
  const [visible, setVisible] = useState(true);

  const layoutMode = useRippleSelector((state) => state.settings.layoutMode);

  // TODO:
  // Link behaviour changes based on layout mode.
  // If we're on a single page, each link will jump to
  // the heading of the appropriate section.
  // That should really be split into different components

  // Paged navigation uses React Router to change the current page.
  if (layoutMode === 'Paged') {
    return (
      <Stack p="md">
        {/* <IconButton
          name="bars"
          size={24}
          label="Toggle navigation"
          onPress={() => setVisible(!visible)}
        /> */}

        {visible && (
          <ScrollArea type="hover" hideDelay={1000}>
            <Stack>
              <Typography color="text.secondary" fontWeight="bold" fontSize="small">
                Outline
              </Typography>
              {Object.keys(form.pages).map((name) => (
                <PageNavLink key={name} name={name} />
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Stack>
    );
  }

  // Single page navigation will scroll the document to the
  // target page heading.
  if (layoutMode === 'Single') {
    return (
      <Stack minWidth={500}>
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
