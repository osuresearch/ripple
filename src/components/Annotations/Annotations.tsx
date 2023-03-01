import React, { useEffect, useState } from 'react';
import { Code, Divider, Heading, Item, Stack, UnstyledList } from '@osuresearch/ui';
import { Thread } from '../Thread';
import { useAnnotationsContext } from '../../hooks/useAnnotationsContext';

function Debug() {
  const { annotations, focused } = useAnnotationsContext();
  return (
    <Stack>
      <Heading level={3}>🔧 Debug things</Heading>
      {focused ? 'Focused: ' + focused.id : 'No focused annotation'}

      <Code block>{JSON.stringify(annotations, undefined, 2)}</Code>
    </Stack>
  );
}

export function Annotations() {
  const { annotations } = useAnnotationsContext();
  const [sorted, setSorted] = useState<Annotation[]>();

  useEffect(() => {
    if (!annotations) return;

    setSorted(
      [...annotations].sort((a, b) => {
        const asel = a.target.selector;
        const bsel = b.target.selector;

        if (asel?.type === 'RippleAnnoSelector' && bsel?.type === 'RippleAnnoSelector') {
          return asel.top < bsel.top ? -1 : 1;
        }

        // TODO: Sorting Adobe selectors
        return 0;
      })
    );
    // TODO: Maybe if they're on the same (or close to the same) top, we
    // sort based on their left axis? Because earlier comments on the same
    // line should probably show up before later comments.
  }, [annotations]);

  return (
    <>
      <Heading level={2}>Comments</Heading>
      {/* TODO: Contextual vs list button. All pages vs current page button. */}

      {sorted?.map((anno) => (
        <Thread key={anno.id} node={anno} />
      ))}

      <Debug />
    </>
  );
}
