import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { FieldComponentProps } from '../../react';
import { useCollection } from '../../hooks/useCollection';
import { EmptyCollection } from '../EmptyCollection';
import { TableRowInstance } from './TableRowInstance';
import { TableHeaders } from './TableHeaders';
import { CollectionInstanceId } from '../../types';
import { normalizeFieldPath } from '../../tools';

export type TableCollectionProps = FieldComponentProps<any> & {
  editInline?: boolean;
  widths?: string[];
};

export function TableCollection({ name, widths, isDisabled, ...props }: TableCollectionProps) {
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
      <Typography>{props.label}</Typography>

      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}

      {ids.length > 0 && (
        <Stack>
          <Box component="table">
            <TableHeaders widths={widths} page={definition.template} isDisabled={isDisabled} />
            <tbody>
              {ids.map((id) => (
                <tr key={id}>
                  <TableRowInstance id={id} name={name} page={definition.template} />
                  {!isDisabled && (
                    <td>
                      <Stack>
                        {/* <IconButton as={Link} name="edit" label="Edit" size={22} to={getSubpageLink(id)} /> */}
                        {/* <IconButton
                          name="xmark"
                          label="Remove"
                          onPress={() => onRemove(id)}
                        /> */}
                        TODO: Icon button
                      </Stack>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Box>

          {!isDisabled && (
            <Stack>
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
