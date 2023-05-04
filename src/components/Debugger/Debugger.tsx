import { Stack, Code, Text, Heading } from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks';

export function Debugger() {
  const {
    watch,
    formState: { touchedFields, dirtyFields, errors, defaultValues },
    getValues
  } = useRippleContext();

  const watched = watch();

  // const { annotations } = useAnnotationsContext();

  return (
    <Stack miw={300} w={300} style={{ overflowX: 'auto' }}>
      <Heading level={3}>RHF</Heading>
      <Text fw="bold">watched</Text>
      <Code block>{JSON.stringify(watched, undefined, 2)}</Code>

      <Text fw="bold">formState.touchedFields</Text>
      <Code block>{JSON.stringify(touchedFields, undefined, 2)}</Code>

      <Text fw="bold">formState.dirtyFields</Text>
      <Code block>{JSON.stringify(dirtyFields, undefined, 2)}</Code>

      <Text fw="bold">formState.errors</Text>
      <Code block>{JSON.stringify(errors, undefined, 2)}</Code>

      <Text fw="bold">formState.defaultValues</Text>
      <Code block>{JSON.stringify(defaultValues, undefined, 2)}</Code>
    </Stack>
  );
}
