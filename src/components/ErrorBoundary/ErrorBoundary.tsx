import React from 'react';
import { useRouteError } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError() as any;
  // Uncaught ReferenceError: path is not defined

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
