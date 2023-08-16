import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FieldComponentProps } from '../../react';
import { useCollection } from '../../hooks/useCollection';
import { InstanceSummary } from '../InstanceSummary';
import { EmptyCollection } from '../EmptyCollection';
import { CollectionInstanceId } from '../../types';
import { normalizeFieldPath } from '../../tools';
import { Stack, IconButton, Divider, Button, Typography } from '@mui/material';

export type SummarizedCollectionProps = FieldComponentProps<any>;

export function SummarizedCollection({ name, isDisabled, ...props }: SummarizedCollectionProps) {
  const location = useLocation();
  const { items, add, remove, definition } = useCollection(name);

  const ids = Object.keys(items).filter((id) => !items[id]._deleted);
  // const deletedIds = Object.keys(items).filter((id) => items[id]._deleted);

  const onAdd = () => {
    const id = add();
  };

  const onRemove = (id: CollectionInstanceId) => {
    remove(id);
  };

  const getSubpageLink = (id: CollectionInstanceId) =>
    normalizeFieldPath(location, `${name}.${id}`);

  return (
    <Stack>
      <Typography variant="h3">{props.label}</Typography>

      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}
      {ids.length > 0 && (
        <Stack>
          {ids.map((id) => (
            <>
              <Stack direction="row" key={id}>
                <InstanceSummary id={id} definition={definition} responses={items[id]} />

                {!isDisabled && (
                  <Stack direction="row">
                    <IconButton
                      as={Link}
                      name="edit"
                      label="Edit"
                      size={22}
                      to={getSubpageLink(id)}
                    />
                    <IconButton
                      name="xmark"
                      label="Remove"
                      size={22}
                      onPress={() => onRemove(id)}
                    />
                  </Stack>
                )}
              </Stack>
              <Divider />
            </>
          ))}

          {!isDisabled && (
            <Stack direction="row" justifyItems="space-between">
              <div></div>
              <Button onClick={onAdd}>Add another</Button>
            </Stack>
          )}
        </Stack>
      )}

      {ids.length < 1 && <EmptyCollection placeholder={props.placeholder} onAdd={onAdd} />}
    </Stack>
  );
}
