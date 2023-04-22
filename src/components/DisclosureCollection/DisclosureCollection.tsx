import React, { useState } from 'react';
import { FieldComponentProps } from '../../react';
import { Alert, Button, Code, Details, Group, Heading, IconButton, Stack, Table, Text } from '@osuresearch/ui';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { InstanceSummary } from '../InstanceSummary';
import { InlineInstance } from './InlineInstance';
import { EmptyCollection } from '../EmptyCollection';
import { CollectionInstanceId } from '../../types';

export type DisclosureCollectionProps = FieldComponentProps<any>;

export function DisclosureCollection({
  name,
  isDisabled,
  ...props
}: DisclosureCollectionProps) {
  const { items, add, remove, definition, getSubpageLink } = useCollection(name);

  const ids = Object.keys(items).filter((id) => !items[id]._deleted);
  // const deletedIds = Object.keys(items).filter((id) => items[id]._deleted);

  const onAdd = () => {
    const id = add();
  }

  const onRemove = (id: CollectionInstanceId) => {
    remove(id);
  }

  if (!definition.summary) {
    return (
      <Alert variant="error" title={`Missing required configuration for ${name}`}>
        The DisclosureCollection component requires a summary to title each instance.
      </Alert>
    )
  }

  return (
    <Stack align="stretch">
      <Heading level={3}>{props.label}</Heading>

      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}
      {ids.length > 0 &&
      <Stack gap={0} align="stretch">
        {ids.map((id) =>
        <Details
          mt="-xxs"
          key={id}
          summary={
            <Group justify="apart">
              <InstanceSummary id={id} definition={definition} responses={items[id]} />
              {!isDisabled &&
              <IconButton name="xmark" label="Remove" size={22} onPress={() => onRemove(id)} />
              }
            </Group>
          }
        >
          <InlineInstance id={id} name={name} page={definition.template} />
        </Details>
        )}

        {!isDisabled &&
        <Group justify="apart" mt="sm">
          <div></div>
          <Button onPress={onAdd}>Add another</Button>
        </Group>
        }
      </Stack>
      }

      {ids.length < 1 &&
      <EmptyCollection placeholder={props.placeholder} onAdd={onAdd} />
      }
    </Stack>
  );
}
