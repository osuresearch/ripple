import React, { useState } from 'react';
import { FieldComponentProps } from '../../react';
import { Alert, Button, Code, Details, Divider, Group, Heading, IconButton, Stack } from '@osuresearch/ui';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { InstanceSummary } from '../InstanceSummary';
import { EmptyCollection } from '../EmptyCollection';
import { InlineInstancePage } from '../InlineInstancePage';
import { CollectionInstanceId } from '../../types';

export type InlineCollectionProps = FieldComponentProps<any>;

export function InlineCollection({
  name,
  isDisabled,
  ...props
}: InlineCollectionProps) {
  const { items, add, remove, definition, getSubpageLink } = useCollection(name);

  const ids = Object.keys(items).filter((id) => !items[id]._deleted);
  // const deletedIds = Object.keys(items).filter((id) => items[id]._deleted);

  const onAdd = () => {
    const id = add();
  }

  const onRemove = (id: CollectionInstanceId) => {
    remove(id);
  }

  return (
    <Stack align="stretch">
      <Heading level={3}>{props.label}</Heading>

      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}
      {ids.length > 0 &&
      <Stack align="stretch" gap={0}>
        {ids.map((id) => <>
          <Group key={id} w="100%" justify="apart" gap="sm">
            <InlineInstancePage id={id} name={name} page={definition.template} />

            {!isDisabled &&
            <IconButton name="xmark" label="Remove" size={22} onPress={() => onRemove(id)} />
            }
          </Group>
          <Divider />
        </>
        )}

        {!isDisabled &&
        <Group justify="apart">
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
