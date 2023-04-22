import React, { useState } from 'react';
import { FieldComponentProps } from '../../react';
import { Alert, Button, Code, Group, Heading, IconButton, Stack, Text } from '@osuresearch/ui';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { EmptyCollection } from '../EmptyCollection';
import styled from 'styled-components';
import { TableRowInstance } from './TableRowInstance';
import { TableHeaders } from './TableHeaders';
import { CollectionInstanceId } from '../../types';

export type TableCollectionProps = FieldComponentProps<any> & {
  editInline?: boolean
  widths?: string[]
}

const Table = styled.table`
  width: 100%;
`;

export function TableCollection({
  name,
  widths,
  isDisabled,
  ...props
}: TableCollectionProps) {
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
      <Stack gap={0} align="stretch">
        <Table>
          <TableHeaders widths={widths} page={definition.template} isDisabled={isDisabled} />
          <tbody>
          {ids.map((id) =>
            <tr key={id}>
              <TableRowInstance id={id} name={name} page={definition.template} />
              {!isDisabled &&
              <td>
                <Group gap="xxs" justify="end">
                  {/* <IconButton as={Link} name="edit" label="Edit" size={22} to={getSubpageLink(id)} /> */}
                  <IconButton name="xmark" label="Remove" size={22} onPress={() => onRemove(id)} />
                </Group>
              </td>
              }
            </tr>
          )}
          </tbody>
        </Table>

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
