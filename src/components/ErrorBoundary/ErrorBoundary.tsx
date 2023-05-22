import React from 'react';
import { useLocation, useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError() as any;
  const location = useLocation();
  // Uncaught ReferenceError: path is not defined

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>Location: {JSON.stringify(location)}</p>
    </div>
  );
}
