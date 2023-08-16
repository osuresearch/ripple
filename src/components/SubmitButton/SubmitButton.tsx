import { Button } from '@mui/material';
import React from 'react';

export type SubmitButtonProps = {
  absolute?: boolean;
};

export function SubmitButton({ absolute = false }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      // sx={
      //   absolute
      //     ? {
      //         position: 'absolute',
      //         right: 'var(--rui-spacing-xs)',
      //         top: 'var(--rui-spacing-xs)',
      //         zIndex: 1000
      //       }
      //     : {}
      // }
    >
      Save &amp; Exit
    </Button>
  );
}
