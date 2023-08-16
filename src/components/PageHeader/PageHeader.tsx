import React from 'react';
import { Markdown } from '../Markdown';
import { PageDefinition, PageErrors, PageName } from '../../types';
import { Paper, Stack, Typography } from '@mui/material';
import { FormErrors } from '../FormErrors';

export type PageHeaderProps = {
  name: PageName;
  page: PageDefinition;
  errors?: PageErrors;
};

/**
 * View for page title, description, and error messages.
 *
 * This is rendered automatically when using an `<AutolayoutPage>`
 * or a `<Page>` with the header enabled.
 */
export function PageHeader({ name, page, errors }: PageHeaderProps) {
  return (
    <Stack gap={2}>
      <Typography variant="h2">
        {/* <HashLink id={'ripple-page-' + name}>{page.title}</HashLink> */}
        {page.title}
      </Typography>

      {page.description && (
        <Paper sx={{ p: 2 }}>
          <Markdown text={page.description} />
        </Paper>
      )}

      <FormErrors errorMessages={errors} />
    </Stack>
  );
}
