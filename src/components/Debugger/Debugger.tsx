import { Stack, Code, Text, Heading } from '@osuresearch/ui';
import React from 'react';
import { useCommentingContext } from '../../hooks/useCommentingContext';
import { useRippleContext } from '../../hooks';

export function Debugger() {
  const {
    formState: { touchedFields, dirtyFields, errors, defaultValues },
    getValues
  } = useRippleContext();

  const { threads } = useCommentingContext();

  return (
    <Stack miw={400} w={400} style={{ overflowX: 'auto' }}>
      <Heading level={2}>RHF</Heading>
      <Text fw="bold">formState.touchedFields</Text>
      <Code block>{JSON.stringify(touchedFields, undefined, 2)}</Code>

      <Text fw="bold">formState.dirtyFields</Text>
      <Code block>{JSON.stringify(dirtyFields, undefined, 2)}</Code>

      <Text fw="bold">formState.errors</Text>
      <Code block>{JSON.stringify(errors, undefined, 2)}</Code>

      <Text fw="bold">formState.defaultValues</Text>
      <Code block>{JSON.stringify(defaultValues, undefined, 2)}</Code>

      <Text fw="bold">getValues</Text>
      <Code block>{JSON.stringify(getValues(), undefined, 2)}</Code>

      <Heading level={2}>Threads</Heading>
      <Code block>{JSON.stringify(threads, undefined, 2)}</Code>
    </Stack>
  );
}
