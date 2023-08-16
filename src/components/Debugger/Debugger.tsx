import React from 'react';
import { useRippleContext } from '../../hooks';
import { Stack, Typography } from '@mui/material';

export function Debugger() {
  const {
    watch,
    formState: { touchedFields, dirtyFields, errors, defaultValues },
    getValues
  } = useRippleContext();

  const watched = watch();

  // const { annotations } = useAnnotationsContext();

  return (
    <Stack minWidth={300} width={300} sx={{ overflowX: 'auto' }}>
      <Typography variant="h3">RHF</Typography>
      <Typography fontWeight="bold">watched</Typography>
      {/* <Code block>{JSON.stringify(watched, undefined, 2)}</Code> */}

      <Typography fontWeight="bold">formState.touchedFields</Typography>
      {/* <Code block>{JSON.stringify(touchedFields, undefined, 2)}</Code> */}

      <Typography fontWeight="bold">formState.dirtyFields</Typography>
      {/* <Code block>{JSON.stringify(dirtyFields, undefined, 2)}</Code> */}

      <Typography fontWeight="bold">formState.errors</Typography>
      {/* <Code block>{JSON.stringify(errors, undefined, 2)}</Code> */}

      <Typography fontWeight="bold">formState.defaultValues</Typography>
      {/* <Code block>{JSON.stringify(defaultValues, undefined, 2)}</Code> */}
    </Stack>
  );
}
