import React from "react";
import { Group, PageButton } from "@osuresearch/ui";
import { Link } from 'react-router-dom';
import { useRippleContext } from "../../hooks";
import { PageName } from "../../types";

export type PaginationProps = {
  current: PageName
}

export function Pagination({ current }: PaginationProps) {
  const { getPreviousPage, getNextPage } = useRippleContext();
  const prev = getPreviousPage(current);
  const next = getNextPage(current);

  return (
    <Group justify="apart">
      {!prev && (
        <PageButton as={Link} to="/" direction="previous">
          Home
        </PageButton>
      )}

      {prev && (
        <PageButton as={Link} to={'/page/' + prev.name} direction="previous">
          {prev.definition.title}
        </PageButton>
      )}

      {next && (
        <PageButton as={Link} to={'/page/' + next.name} direction="next">
          {next.definition.title}
        </PageButton>
      )}

      {!next && (
        <PageButton<typeof Link> as={Link} to="/submit" direction="next">
          Review &amp; Submit
        </PageButton>
      )}
    </Group>
  );
}
