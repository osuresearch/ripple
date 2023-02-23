import React, { useEffect, useState } from 'react';
import { Divider, Heading, Item, Stack, UnstyledList } from '@osuresearch/ui';
import { Thread } from '../Thread';
import { useRippleContext } from '../../hooks/useRippleContext';
import { useCommentingContext } from '../../hooks/useCommentingContext';

export function Comments() {
  const { threads } = useCommentingContext();
  const [sorted, setSorted] = useState<Thread[]>();

  useEffect(() => {
    setSorted(
      [...threads].sort((a, b) =>
        (a.context.rect?.top ?? 0) < (b.context.rect?.top ?? 0) ? -1 : 1
      )
    );
    // TODO: Maybe if they're on the same (or close to the same) top, we
    // sort based on their left axis? Because earlier comments on the same
    // line should probably show up before later comments.
  }, [threads]);

  return (
    <>
      <Heading level={2}>Comments</Heading>
      {/* TODO: Contextual vs list button. All pages vs current page button. */}

      {sorted?.map((thread) => (
        <Thread key={thread.id} node={thread} />
      ))}
    </>
  );
}
