import { Box, FocusRing, Stack, Divider, Link, Text, IconButton, ScrollArea, Icon, Group, Tooltip } from '@osuresearch/ui';
import { isActive } from '@tiptap/core';
import React, { CSSProperties, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { toggleNavigation } from '../../features/settings';
import { useCondition, useRippleContext } from '../../hooks';
import { Conditional } from '../Conditional';
import { Debugger } from '../Debugger';
import { PageName } from '../../types';

const StyledNavLink = styled.div<{ isActive: boolean, isHidden: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 4px;
  margin-left: -4px;

  color: ${
    (props) => props.isHidden ? 'var(--rui-dark)'
      : (props.isActive ? 'var(--rui-primary)'
      : 'var(--rui-light-contrast)')
  };

  box-shadow: ${(props) => props.isActive ? '-4px 0px 0px 0px var(--rui-primary)' : 'none'};
`

type PageNavLinkProps = {
  name: PageName;
  children?: React.ReactNode;
};

function PageNavLink({ name, children }: PageNavLinkProps) {
  const { form, selector } = useRippleContext();
  const definition = form.pages[name];

  const showConditions = selector((state) => state.settings.showConditions);

  const { passed, error, fields, references } = useCondition(definition.condition);

  if (!definition) {
    return (
      <Box bgc="error" c="error-contrast" p="xs">
        Missing page &apos;{name}&apos;
      </Box>
    );
  }

  if (!showConditions && !passed) {
    return null;
  }

  return (
    <FocusRing>
      <Group w={300} justify="apart" px="xs">
        <NavLink to={'page/' + name} style={{ maxWidth: 250 }}>
          {({ isActive }) => <StyledNavLink isActive={isActive} isHidden={!passed}>
            {definition.title} {children}
          </StyledNavLink>}
        </NavLink>

        {showConditions && definition.condition &&
        <Tooltip contentSlot="This page is conditionally displayed" delay={0}>
          <NavLink to={'page/' + name}>
            <Icon size={20} name={passed ? 'eye' : 'eyeSlash'} c="error" aria-label="Conditional" />
          </NavLink>
        </Tooltip>
        }

        {!showConditions &&
          <Icon name="exclamationFill" c="error" aria-label="Errors" />
        }
      </Group>
    </FocusRing>
  );
}

export function Navigation() {
  const { selector, dispatch, form } = useRippleContext();

  const showNavigation = selector((state) => state.settings.showNavigation);
  const layoutMode = selector((state) => state.settings.layoutMode);
  const dispatcher = dispatch();

  // Link behaviour changes based on layout mode.
  // If we're on a single page, each link will jump to
  // the heading of the appropriate section.

  // Paged navigation uses React Router to change the current page.
  if (layoutMode === 'Paged') {
    return (
      <Stack p="md">
        <IconButton
          name="bars"
          size={24}
          label="Toggle navigation"
          onPress={() => dispatcher(toggleNavigation(!showNavigation))}
        />

        {showNavigation &&
        <ScrollArea h="100px" type="hover" style={{ flexGrow: 1 }} hideDelay={1000}>
          <Stack gap="xs">
            <Text c="dark" fw="bold" fs="sm">Outline</Text>
            {Object.keys(form.pages).map((name) => (
              <PageNavLink key={name} name={name} />
            ))}
          </Stack>
        </ScrollArea>
        }
      </Stack>
    );
  }

  // Single page navigation will scroll the document to the
  // target page heading.
  if (layoutMode === 'Single') {
    return (
      <Stack miw={500}>
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
