import React, { useEffect, useState } from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';
import { FieldComponentProps } from '../../react';
import { Button, Group, Heading, Stack, Text } from '@osuresearch/ui';
import { InstanceSummary } from '../InstanceSummary/InstanceSummary';
import { useCollection } from '../../hooks/useCollection';
import { DeleteButton } from './DeleteButton';
import { SubpageLink } from './SubpageLink';
import { CollectionInstanceId } from '../../types';

export type CollectionProps = FieldComponentProps<any> & {
  variant?: 'subpage' | 'inline'
}

export function Collection({
  name = '__invalid',
  variant = 'inline',
  isDisabled,
  ...props
}: CollectionProps) {
  const { items, add, remove, definition } = useCollection(name);
  const [recentlyAdded, setRecentlyAdded] = useState<string | undefined>();

  const ids = Object.keys(items).filter((id) => !items[id]._deleted);
  // const deletedIds = Object.keys(items).filter((id) => items[id]._deleted);

  const onAdd = () => {
    const id = add();
    setRecentlyAdded(id);
  }

  const onRemove = (id: CollectionInstanceId) => {
    remove(id);
  }

  return (
    <Stack align="stretch">
      <Group justify="apart" align="center">
        <Heading level={3}>{props.label}</Heading>

        {!isDisabled && <Button onPress={onAdd}>Add</Button>}
      </Group>

      {props.description}

      variant: {variant}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}

      <Stack gap={0} align="stretch">
        {ids.map((id) =>
        <Group key={id}>
          <InstanceSummary
            id={id}
            definition={definition}
            responses={items[id]}
          />
          {!isDisabled &&
          <div>
            <SubpageLink id={id} name={name} label="Edit" />
            <DeleteButton id={id} definition={definition} onRemove={onRemove} />
          </div>
          }
        </Group>)}
      </Stack>

      {ids.length < 1 && (
        <Text>{
          props.placeholder
          ?? 'There\'s nothing here! Click the Add button to start adding entries'
        }</Text>
      )}
    </Stack>
  );
}
