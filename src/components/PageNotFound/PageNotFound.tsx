import { Typography } from '@mui/material';
import React from 'react';

/**
 * 404 content for when the user tries to access a missing page / subpage.
 *
 * This is rendered automatically via the `FormRouter`.
 */
export function PageNotFound() {
  // TODO: Helpful content.
  // Maybe direct them to the first page with errors
  // or first page that hasn't been touched.
  // Or just the beginning of the form.
  // Or a similar pages fuzzy search against the url?
  return (
    <div>
      <Typography variant="h2">Page not found</Typography>
      <Typography>Whoops</Typography>
    </div>
  );
}
