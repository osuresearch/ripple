import { Paper, Text } from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';

// type TrainingProps = {};

/**
 * Component that monitors team member search
 * input on the new study team member page and
 * reports back training information to the end user.
 */
export function Training() {
  const { watch } = useRippleContext();

  const person = watch('person');

  return (
    <Paper>
      <Text>Training for {person ?? 'nobody'}</Text>
    </Paper>
  );
}
