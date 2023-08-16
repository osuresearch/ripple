import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
export interface SummaryProps {}

export function Summary(props: SummaryProps) {
  return (
    <Stack>
      {/* <HashLink id="ripple-summary"> */}
      <Typography variant="h2">Submission summary</Typography>
      {/* </HashLink> */}

      <Typography>
        TODO: Full form error scanning, verification, wiring into implementing apps, custom
        markdown, etc.
      </Typography>

      <Button>Submit</Button>
    </Stack>
  );
}
