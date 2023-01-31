import {
  CheckboxField,
  CheckboxSetField,
  Code,
  Group,
  Item,
  Paper,
  RadioSetField,
  Stack,
  Text
} from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';

import { toggleComments, toggleConditions, setDiffMode } from '../../features/settings';

// export type RibbonProps = {};

export function Ribbon() {
  const ctx = useRippleContext();
  const {
    getValues,
    formState: { errors, dirtyFields, touchedFields, defaultValues }
  } = ctx;

  const diffMode = ctx.selector((state) => state.settings.diffMode);
  const showComments = ctx.selector((state) => state.settings.showComments);
  const showConditions = ctx.selector((state) => state.settings.showConditions);
  const dispatch = ctx.dispatch();

  return (
    <Paper
      shadow="md"
      p="sm"
      mb="xl"
      mah={180}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        overflowY: 'scroll'
      }}
    >
      <Group>
        <RadioSetField
          label="View as"
          value={diffMode}
          onChange={(value) => {
            dispatch(setDiffMode(value as DiffMode));
          }}
        >
          <Item key="Current">Current version</Item>
          <Item key="Unified">Unified diff</Item>
          <Item key="SideBySide">Side by side diff</Item>
        </RadioSetField>

        <Stack>
          <CheckboxField
            isSelected={showComments}
            label="Show comments"
            onChange={(value) => dispatch(toggleComments(value))}
          />

          <CheckboxField
            isSelected={showConditions}
            label="Show conditions"
            onChange={(value) => dispatch(toggleConditions(value))}
          />
        </Stack>

        <Stack>
          <Text fw="bold">formState.touchedFields</Text>
          <Code block>{JSON.stringify(touchedFields, undefined, 2)}</Code>

          <Text fw="bold">formState.dirtyFields</Text>
          <Code block>{JSON.stringify(dirtyFields, undefined, 2)}</Code>
        </Stack>

        <Stack>
          <Text fw="bold">formState.errors</Text>
          <Code block>{JSON.stringify(errors, undefined, 2)}</Code>
        </Stack>

        <Stack>
          <Text fw="bold">formState.defaultValues</Text>
          <Code block>{JSON.stringify(defaultValues, undefined, 2)}</Code>
        </Stack>

        <Stack>
          <Text fw="bold">getValues</Text>
          <Code block>{JSON.stringify(getValues(), undefined, 2)}</Code>
        </Stack>
      </Group>
    </Paper>
  );
}
