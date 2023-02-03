import React from 'react';
import { Text, Heading, Stack, HashLink, Button } from '@osuresearch/ui';

export type SummaryProps = {
  placeholderBecauseUnexpectedEmptyObjectPattern?: string;
};

export function Summary(props: SummaryProps) {
  return (
    <Stack>
      <HashLink id="ripple-summary">
        <Heading level={2}>Submission summary</Heading>
      </HashLink>

      <Text>
        TODO: Full form error scanning, verification, wiring into implementing apps, custom
        markdown, etc.
      </Text>

      <Button>Submit</Button>
    </Stack>
  );
}
