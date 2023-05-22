import React from 'react';
import { Breadcrumbs as RUIBreadcrumbs, Link as RUILink, Text } from '@osuresearch/ui';
import { PageDeepLink } from '../../react';
import { Link } from 'react-router-dom';

export type BreadcrumbsProps = {
  items: PageDeepLink[]
}

/**
 * Simple breadcrumb renderer for subpages.
 *
 * The last item in the `items` prop will be inactive and considered
 * the "current" page.
 *
 * Note that the breadcrumbs currently depend on react-router-dom.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const [...links] = items;
  const last = links.pop();

  return (
    <RUIBreadcrumbs>
      {links.map((link, i) =>
        <RUILink as={Link} key={i} to={link.href}>
          {link.label}
        </RUILink>
      )}
      <Text c="dark">{last?.label}</Text>
    </RUIBreadcrumbs>
  )
}
