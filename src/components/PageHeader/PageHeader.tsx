import { Box, FormErrors, HashLink, Heading, Paper } from "@osuresearch/ui"
import React from "react"
import { Markdown } from "../Markdown"
import { PageDefinition, PageErrors, PageName } from "../../types"

export type PageHeaderProps = {
  name: PageName
  page: PageDefinition
  errors?: PageErrors
}

/**
 * View for page title, description, and error messages.
 *
 * This is rendered automatically when using an `<AutolayoutPage>`
 * or a `<Page>` with the header enabled.
 */
export function PageHeader({ name, page, errors }: PageHeaderProps) {
  return (
    <Box>
      <Heading level={2}>
        <HashLink id={'ripple-page-' + name}>{page.title}</HashLink>
      </Heading>

      {page.description && (
        <Paper px="lg" pt="lg" pb="sm" bgc="light" shadow="sm" withBorder>
          <Markdown text={page.description} />
        </Paper>
      )}

      <FormErrors errorMessages={errors} />
    </Box>
  );
}
