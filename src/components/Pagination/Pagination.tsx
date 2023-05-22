import React from "react";
import { Box, Group, PageButton } from "@osuresearch/ui";
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
    <Group justify="apart" w="100%">
      {!prev && (
        <Box w="100%" />
      )}

      {prev && (
        <PageButton as="a" href={prev.name} direction="previous">
          {prev.definition.title}
        </PageButton>
      )}

      {next && (
        <PageButton as="a" href={next.name} direction="next">
          {next.definition.title}
        </PageButton>
      )}

      {!next && (
        <PageButton as="a" href="/submit" direction="next">
          Review &amp; Submit
        </PageButton>
      )}
    </Group>
  );
}
