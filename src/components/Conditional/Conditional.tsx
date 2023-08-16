import React from 'react';
import { ConditionInformation } from './ConditionInformation';
import { useCondition, useRippleContext, useRippleSelector } from '../../hooks';
import { Condition } from '../../types';
import { Paper } from '@mui/material';

export type ConditionalProps = {
  name: string;

  /**
   * Condition that must be evaluated to true before children can be rendered
   */
  condition?: Condition;

  children: React.ReactNode;
};

/**
 * Conditionally render children based on evaluating Ripple form state.
 *
 * This makes use of [filtrex](https://www.npmjs.com/package/filtrex)
 * expressions for evaluating the current form state.
 */
export function Conditional({ name, condition, children }: ConditionalProps) {
  const showConditions = useRippleSelector((state) => state.settings.showConditions);

  const { passed, error, references } = useCondition(condition);

  // Display the children regardless of passing the condition
  // *and* show information about the condition itself.
  if (showConditions && condition) {
    return (
      <ConditionInformation
        name={name}
        references={references}
        condition={condition}
        passed={passed}
      >
        {error && <Paper>{error}</Paper>}
        {children}
      </ConditionInformation>
    );
  }

  // Default behaviour: only show the children if the condition passes
  if (!passed) {
    return null;
  }

  return <>{children}</>;
}
