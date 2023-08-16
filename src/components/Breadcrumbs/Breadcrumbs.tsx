import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink } from '@mui/material';

import { PageDeepLink } from '../../react';

export type BreadcrumbsProps = {
  items: PageDeepLink[];
};

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
    <MuiBreadcrumbs>
      {links.map((link, i) => (
        <MuiLink component={Link} key={i} to={link.href}>
          {link.label}
        </MuiLink>
      ))}
      <span>{last?.label}</span>
    </MuiBreadcrumbs>
  );
}
