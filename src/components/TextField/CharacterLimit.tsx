import React from 'react';
import { VisuallyHidden, Icon } from '@osuresearch/ui';
import { Typography } from '@mui/material';

export type CharacterLimitProps = {
  count: number;
  limit: number;
};

export function CharacterLimit({ count, limit }: CharacterLimitProps) {
  const isNearCharacterLimit = limit && count / limit > 0.8;

  return (
    <Typography fontSize="small" color={isNearCharacterLimit ? 'error.main' : 'text.secondary'}>
      {isNearCharacterLimit && <Icon name="exclamationFill" mb={0.5} />}{' '}
      <VisuallyHidden>Character count: </VisuallyHidden>
      {count}
      <VisuallyHidden> out of </VisuallyHidden> / {limit}
    </Typography>
  );
}
