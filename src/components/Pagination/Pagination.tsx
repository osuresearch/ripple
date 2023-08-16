import React from 'react';
import { useRippleContext } from '../../hooks';
import { PageName } from '../../types';
import { Box, Button, Stack } from '@mui/material';
import { PageButton } from '../PageButton';
import { Link } from 'react-router-dom';

export type PaginationProps = {
  current: PageName;
};

export function Pagination({ current }: PaginationProps) {
  const { getPreviousPage, getNextPage } = useRippleContext();
  const prev = getPreviousPage(current);
  const next = getNextPage(current);

  return (
    <Stack direction="row" width="100%" gap={2}>
      {prev && (
        <PageButton<typeof Link> component={Link} to={`/${prev.name}`} variant="previous">
          {prev.definition.title}
        </PageButton>
      )}
      {next && (
        <PageButton<typeof Link> component={Link} to={`/${next.name}`} variant="next">
          {next.definition.title}
        </PageButton>
      )}
      {!next && (
        <PageButton<typeof Link> component={Link} to="/submit" variant="next">
          Review &amp; Submit
        </PageButton>
      )}
    </Stack>
  );
}
