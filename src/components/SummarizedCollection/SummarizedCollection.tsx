import React, { useState } from 'react';
import { FieldComponentProps } from '../../react';
import { Alert, Button, Code, Details, Divider, Group, Heading, IconButton, Stack } from '@osuresearch/ui';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { InstanceSummary } from '../InstanceSummary';
import { EmptyCollection } from '../EmptyCollection';
import { CollectionInstanceId } from '../../types';

export type SummarizedCollectionProps = FieldComponentProps<any>;

export function SummarizedCollection({
  name,
  isDisabled,
  ...props
}: SummarizedCollectionProps) {
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
      <Stack align="stretch" gap="sm">
        {ids.map((id) => <>
          <Group key={id} w="100%" justify="apart">
            <InstanceSummary id={id} definition={definition} responses={items[id]} />

            {!isDisabled &&
            <Group gap="xxs" justify="end">
              <IconButton as={Link} name="edit" label="Edit" size={22} to={getSubpageLink(id)} />
              <IconButton name="xmark" label="Remove" size={22} onPress={() => onRemove(id)} />
            </Group>
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
