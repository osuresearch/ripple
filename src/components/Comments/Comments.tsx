import React from 'react';
import { Divider, Heading, Stack } from '@osuresearch/ui';
import { Comment } from '../Comment';
import { useRippleContext } from '../../hooks/useRippleContext';

export function Comments() {
  const { selector } = useRippleContext();

  const showComments = selector((state) => state.settings.showComments);

  if (!showComments) {
    return null;
  }

  return (
    <>
      <Divider orientation="vertical" />
      <Stack miw={400} align="stretch">
        <Heading level={2}>Comments</Heading>
        <Comment />
        <Comment />
        <Comment />
      </Stack>
    </>
  );
}
