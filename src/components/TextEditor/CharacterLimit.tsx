import React from 'react';
import { VisuallyHidden, Text, Icon } from "@osuresearch/ui";

export type CharacterLimitProps = {
  count: number
  limit: number
}

export function CharacterLimit({ count, limit }: CharacterLimitProps) {
  const isNearCharacterLimit = limit && (count / limit > 0.8);

  return (
    <Text fs="sm" c={isNearCharacterLimit ? 'warning-shade' : 'dark'} style={{ float: 'right' }}>
      {isNearCharacterLimit && <Icon name="exclamationFill" />}{' '}
      <VisuallyHidden>Character count: </VisuallyHidden>
      {count}
      <VisuallyHidden> out of </VisuallyHidden>
      {' '} / {limit}
    </Text>
  )
}
