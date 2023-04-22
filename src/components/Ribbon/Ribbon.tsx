import {
  CheckboxField,
  CheckboxSetField,
  Code,
  Divider,
  Group,
  Icon,
  Item,
  Paper,
  RadioSetField,
  SelectField,
  Stack,
  TabPanel,
  Text,
  ToggleButton
} from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';

import {
  toggleComments,
  toggleConditions,
  setDiffMode,
  toggleNavigation,
  toggleDebugger,
  setLayoutMode,
  setInteractionMode
} from '../../features/settings';
import { SubmitButton } from '../SubmitButton';
import { Awareness } from '../Awareness';
import { DiffMode, LayoutMode, InteractionMode } from '../../types';

// export type RibbonProps = {};

export function Ribbon() {
  const ctx = useRippleContext();
  const {
    getValues,
    formState: { errors, dirtyFields, touchedFields, defaultValues }
  } = ctx;

  const showComments = ctx.selector((state) => state.settings.showComments);
  const showConditions = ctx.selector((state) => state.settings.showConditions);
  const showNavigation = ctx.selector((state) => state.settings.showNavigation);
  const showDebugger = ctx.selector((state) => state.settings.showDebugger);
  const diffMode = ctx.selector((state) => state.settings.diffMode);
  const layoutMode = ctx.selector((state) => state.settings.layoutMode);
  const interactionMode = ctx.selector((state) => state.settings.interactionMode);
  const dispatch = ctx.dispatch();

  return (
    <Paper
      shadow="md"
      bgc="light"
      p={0}
      h={108}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        overflowY: 'hidden'
      }}
    >
      <Group justify="apart">
        <TabPanel variant="simple">
          {/* <Item title="Home">
            <Group p="sm">Formatting things</Group>
          </Item> */}
          <Item title="Developer">
            <Group p="sm">

            <ToggleButton
                variant="default"
                isSelected={showDebugger}
                onChange={(value) => dispatch(toggleDebugger(value as boolean))}
              >
                <Icon name="code" /> Debugger
              </ToggleButton>

              <ToggleButton
                variant="default"
                isSelected={showConditions}
                onChange={(value) => dispatch(toggleConditions(value as boolean))}
              >
                <Icon name="code" /> Conditions
              </ToggleButton>

            </Group>
          </Item>
          <Item title="Review">
            <Group p="sm">
              <ToggleButton
                variant="default"
                isSelected={showComments}
                onChange={(value) => dispatch(toggleComments(value as boolean))}
              >
                Comments
              </ToggleButton>

              <Divider orientation="vertical" gap={0} />

              <SelectField
                name="trackedChanges"
                aria-label="View tracked changes as"
                value={diffMode}
                onChange={(value) => {
                  dispatch(setDiffMode(value as DiffMode));
                }}
              >
                <Item key="Current">Current version</Item>
                <Item key="Unified">Unified diff</Item>
                <Item key="SideBySide">Side by side diff</Item>
              </SelectField>
            </Group>
          </Item>
          <Item title="View">
            <Group p="sm">
              <ToggleButton
                variant="default"
                isSelected={showNavigation}
                onChange={(value) => dispatch(toggleNavigation(value as boolean))}
              >
                Navigation
              </ToggleButton>

              <Divider orientation="vertical" gap={0} />

              <SelectField
                name="layout"
                aria-label="Layout"
                value={layoutMode}
                onChange={(value) => {
                  dispatch(setLayoutMode(value as LayoutMode));
                }}
              >
                <Item key="Paged">Paged</Item>
                <Item key="Single">Single page</Item>
              </SelectField>

              <Divider orientation="vertical" gap={0} />

              <SelectField
                name="interactionMode"
                aria-label="Interaction Mode"
                value={interactionMode}
                onChange={(value) => {
                  dispatch(setInteractionMode(value as InteractionMode));
                }}
              >
                <Item key="Edit">Editable</Item>
                <Item key="Read">Read Only</Item>
                <Item key="Review">Review</Item>
              </SelectField>
            </Group>
          </Item>
          <Item title="Help">
            <Group p="sm">Docs link, contact support link, about this product, etc.</Group>
          </Item>
        </TabPanel>

        <Group p="sm">
          <Awareness />
          <SubmitButton />
        </Group>
      </Group>
    </Paper>
  );
}
