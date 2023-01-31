import { Stack, Link } from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';

export type TableOfContentsProps = {
  /**
   * Render either as a fixed aside menu or inlined at the top of the form.
   */
  variant?: 'aside' | 'inline';
};

export function TableOfContents(props: TableOfContentsProps) {
  const { form } = useRippleContext();

  const visiblePages = Object.keys(form.pages);
  // TODO: Condition check pages.
  // TODO: Access control check pages.

  return (
    <Stack miw={200}>
      {visiblePages.map((name) => (
        <Link key={name} href={`#ripple-page-${name}`}>
          {form.pages[name].title}
        </Link>
      ))}
    </Stack>
  );
}
