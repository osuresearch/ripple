import { Stack, Code, Text } from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks';

export function Debugger() {
  const {
    formState: { touchedFields, dirtyFields, errors, defaultValues },
    getValues
  } = useRippleContext();

  return (
    <Stack miw={400} style={{ overflowX: 'auto' }}>
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
    </Stack>
  );
}
