import React from 'react';
import { FieldComponentProps } from '../../react';
import { useCollection } from '../../hooks/useCollection';
import { EmptyCollection } from '../EmptyCollection';
import { InlineInstancePage } from '../InlineInstancePage';
import { CollectionInstanceId } from '../../types';
import { Stack, Typography, Button, IconButton, Divider } from '@mui/material';

export type InlineCollectionProps = FieldComponentProps<any>;

export function InlineCollection({ name, isDisabled, ...props }: InlineCollectionProps) {
  const { items, add, remove, definition } = useCollection(name);

  const ids = Object.keys(items).filter((id) => !items[id]._deleted);
  // const deletedIds = Object.keys(items).filter((id) => items[id]._deleted);

  const onAdd = () => {
    const id = add();
  };

  const onRemove = (id: CollectionInstanceId) => {
    remove(id);
  };

  return (
    <Stack>
      <Typography variant="h3">{props.label}</Typography>

      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}
      {ids.length > 0 && (
        <Stack>
          {ids.map((id) => (
            <>
              <Stack key={id} justifyContent="space-between">
                <InlineInstancePage id={id} name={name} page={definition.template} />

                {!isDisabled && (
                  <IconButton name="xmark" label="Remove" size={22} onClick={() => onRemove(id)} />
                )}
              </Stack>
              <Divider />
            </>
          ))}

          {!isDisabled && (
            <Stack justifyContent="space-between">
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
