import { Button, Stack } from '@osuresearch/ui';
import React from 'react';

export type EmptyCollectionProps = {
  placeholder?: React.ReactNode
  onAdd: () => void
}

export function EmptyCollection({ placeholder, onAdd }: EmptyCollectionProps) {
  return (
    <Stack>
      {placeholder}
      <Button variant="primary" onPress={onAdd}>Add a new entry</Button>
    </Stack>
  )
}
