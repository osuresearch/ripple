import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { Icon } from '@osuresearch/ui';

export type PageButtonProps<RootComponent extends React.ElementType<any> = 'button'> = Omit<
  ButtonProps<RootComponent>,
  'variant' | 'startIcon' | 'endIcon'
> & {
  variant: 'previous' | 'next';
};

const StyledButton = styled(Button)(({ theme }) => ({
  'padding': 24,
  'width': '50%',
  '&.MuiButton-outlinedPrimary': {
    border: `2px solid ${theme.palette.background.paper}`
  },
  'minWidth': 300
}));

/**
 * Used internally for `Pagination` buttons
 */
export function PageButton<RootComponent extends React.ElementType<any> = 'button'>({
  variant,
  children,
  ...props
}: PageButtonProps<RootComponent>) {
  return (
    <StyledButton
      {...props}
      variant="outlined"
      startIcon={
        variant === 'previous' ? <Icon name="chevron" size={32} rotate={180} /> : undefined
      }
      endIcon={variant === 'next' ? <Icon name="chevron" size={32} /> : undefined}
      sx={{
        justifyContent: variant === 'next' ? 'right' : 'left'
      }}
    >
      {children}
    </StyledButton>
  );
}
