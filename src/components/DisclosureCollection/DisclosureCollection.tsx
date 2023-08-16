import React from 'react';

import { FieldComponentProps } from '../../react';
import { useCollection } from '../../hooks/useCollection';
import { InstanceSummary } from '../InstanceSummary';
import { InlineInstance } from './InlineInstance';
import { EmptyCollection } from '../EmptyCollection';
import { CollectionInstanceId } from '../../types';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';

export type DisclosureCollectionProps = FieldComponentProps<any>;

export function DisclosureCollection({ name, isDisabled, ...props }: DisclosureCollectionProps) {
  const { items, add, remove, definition } = useCollection(name);

  const ids = Object.keys(items).filter((id) => !items[id]._deleted);
  // const deletedIds = Object.keys(items).filter((id) => items[id]._deleted);

  const onAdd = () => {
    const id = add();
  };

  const onRemove = (id: CollectionInstanceId) => {
    remove(id);
  };

  if (!definition.summary) {
    return (
      <Alert severity="error">
        <AlertTitle>Missing required configuration for {name}</AlertTitle>
        The DisclosureCollection component requires a summary to title each instance.
      </Alert>
    );
  }

  return (
    <Stack>
      <Typography variant="h3">{props.label}</Typography>

      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}
      {ids.length > 0 && (
        <Stack>
          {/* {ids.map((id) => (
            <Details
              mt="-xxs"
              key={id}
              summary={
                <Group justify="apart">
                  <InstanceSummary id={id} definition={definition} responses={items[id]} />
                  {!isDisabled && (
                    <IconButton
                      name="xmark"
                      label="Remove"
                      size={22}
                      onPress={() => onRemove(id)}
                    />
                  )}
                </Group>
              }
            >
              <InlineInstance id={id} name={name} page={definition.template} />
            </Details>
          ))} */}

          {!isDisabled && (
            <Stack direction="row">
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
