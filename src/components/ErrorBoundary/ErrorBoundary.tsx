import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useRouteError } from 'react-router-dom';

/**
 * Component used by `FormRouter` for rendering an
 * error state if an exception is bubbled up from a page.
 * @returns
 */
export function ErrorBoundary() {
  const error = useRouteError() as any;
  const location = useLocation();
  // Uncaught ReferenceError: path is not defined

  return (
    <Stack>
      <Typography variant="h1">Oops!</Typography>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>Location: {JSON.stringify(location)}</p>
    </Stack>
  );
}
