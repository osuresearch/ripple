import { Alert, AlertTitle, Link } from '@mui/material';
import { FocusableElement } from '@osuresearch/ui';
import React, { forwardRef } from 'react';

export type FormErrorsProps = {
  errorMessages?: {
    [field: string]: {
      message?: string;
    };
  };

  children?: React.ReactNode;
};

/**
 * Render a set of validation error messages for the current page.
 *
 * Each entry of `errorMessages` must point to a visible Ripple field
 * on the current page in order to support navigation for screen readers.
 */
export function FormErrors({ errorMessages }: FormErrorsProps) {
  if (!errorMessages) {
    return null;
  }

  const keys = Object.keys(errorMessages);
  if (keys.length < 1) {
    return null;
  }

  const focusField = (name: string) => {
    const el = document.querySelector(`[data-label-for="${name}"]`);
    if (el) {
      (el as FocusableElement).focus();
    }
  };

  // TODO: The link name needs to either be a summary of the label
  // (paraphrased), or the message is a summary and the whole line
  // is a link to that error.

  return (
    <Alert severity="error">
      <AlertTitle>There are {keys.length} problems to fix in this form</AlertTitle>
      <ul>
        {keys.map((name) => (
          <li key={name}>{errorMessages[name as any].message}</li>
        ))}
      </ul>

      <Link color="error.contrastText" component="button" onClick={() => focusField(keys[0])}>
        Go to the first field with an error to fix it
      </Link>
    </Alert>
  );
}
