import React from 'react';
import { Paper } from '@osuresearch/ui';
import { ConditionInformation } from './ConditionInformation';
import { useCondition, useRippleContext } from '../../hooks';
import { Condition } from '../../types';

export type ConditionalProps = {
  name: string;

  /**
   * Condition that must be evaluated to true before children can be rendered
   */
  condition?: Condition;

  children: React.ReactNode;
};

/**
 * Conditionally render children based on evaluating Ripple conditionals
 */
export function Conditional({ name, condition, children }: ConditionalProps) {
  const { selector } = useRippleContext();
  const showConditions = selector((state) => state.settings.showConditions);

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
        {error && (
          <Paper p="xs" bgc="error" c="error-contrast">
            {error}
          </Paper>
        )}
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
