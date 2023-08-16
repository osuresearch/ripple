import { Stack, Button } from '@mui/material';
import React from 'react';

export type EmptyCollectionProps = {
  placeholder?: React.ReactNode;
  onAdd: () => void;
};

export function EmptyCollection({ placeholder, onAdd }: EmptyCollectionProps) {
  return (
    <Stack>
      {placeholder}
      <Button onClick={onAdd}>Add a new entry</Button>
    </Stack>
  );
}
