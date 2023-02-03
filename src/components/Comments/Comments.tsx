import React from 'react';
import { Divider, Heading, Stack } from '@osuresearch/ui';
import { Thread } from '../Thread';
import { useRippleContext } from '../../hooks/useRippleContext';
import { irbInitialThreads } from '../../app/mocks';

export function Comments() {
  const { selector } = useRippleContext();

  const showComments = selector((state) => state.settings.showComments);

  if (!showComments) {
    return null;
  }

  const mocks = irbInitialThreads;

  return (
    <>
      <Divider orientation="vertical" />
      <Stack miw={400} align="stretch">
        <Heading level={2}>Comments</Heading>
        TODO: Contextual vs list button. All pages vs current page button.
        {mocks.map((thread) => (
          <Thread key={thread.id} node={thread} />
        ))}
      </Stack>
    </>
  );
}
