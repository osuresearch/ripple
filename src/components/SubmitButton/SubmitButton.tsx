import React from 'react';
import { Button } from '@osuresearch/ui';

export type SubmitButtonProps = {
  absolute?: boolean;
};

export function SubmitButton({ absolute = false }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      style={
        absolute
          ? {
              position: 'absolute',
              right: 'var(--rui-spacing-xs)',
              top: 'var(--rui-spacing-xs)',
              zIndex: 1000
            }
          : {}
      }
    >
      Save &amp; Exit
    </Button>
  );
}
