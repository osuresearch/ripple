import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Conditional } from './Conditional';
import { useRippleDispatch, useRippleSelector } from '../../hooks';
import { toggleConditions } from '../../features/settings';
import { Button, Typography } from '@mui/material';
import { FormProvider } from '../FormProvider';

const meta: Meta<typeof Conditional> = {
  title: 'Internal/Conditional',
  component: Conditional,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Conditional>;

function ToggleShowConditionsButton() {
  const dispatch = useRippleDispatch();
  const showConditions = useRippleSelector((state) => state.settings.showConditions);

  return (
    <Button onClick={() => dispatch(toggleConditions(!showConditions))}>
      {showConditions ? 'Hide' : 'Show'} condition info
    </Button>
  );
}

export const Truthy: Story = {
  render: (args) => (
    <>
      <Conditional {...args}>
        <Typography>I am conditionally visible!</Typography>
      </Conditional>
      <ToggleShowConditionsButton />
    </>
  ),
  args: {
    name: 'exampleCondition',
    condition: 'true == true'
  }
};

export const Falsey: Story = {
  ...Truthy,
  args: {
    name: 'exampleFalsey',
    condition: 'true == false'
  }
};
