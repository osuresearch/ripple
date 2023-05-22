import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Conditional } from './Conditional';
import { Button, Text } from '@osuresearch/ui';
import { FormProvider } from '../FormProvider';
import { useRippleDispatch, useRippleSelector } from '../../hooks';
import { toggleConditions } from '../../features/settings';

const meta: Meta<typeof Conditional> = {
  title: 'Components/Conditional',
  component: Conditional,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Conditional>;

function ToggleShowConditionsButton() {
  const dispatch = useRippleDispatch();
  const showConditions = useRippleSelector((state) => state.settings.showConditions);

  return (
    <Button onPress={() => dispatch(toggleConditions(!showConditions))}>
      {showConditions ? 'Hide' : 'Show'} condition info
    </Button>
  )
}

export const Example: Story = {
  render: (args) => (
    <FormProvider form={{ title: '', version: '', pages: {} }}>
      <Conditional {...args}>
        <Text as="div">I am conditionally visible!</Text>
      </Conditional>
      <ToggleShowConditionsButton />
    </FormProvider>
  ),
  args: {
    name: 'exampleCondition',
    condition: 'true == true',
  }
}
