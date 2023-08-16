import React, { useId } from 'react';
import { styled } from '@mui/material';
import { MediaObject } from '@osuresearch/types';
import { FormField } from '@osuresearch/ui';

import { BaseFieldProps } from '../../react';

export type AttachmentsFieldProps = BaseFieldProps<MediaObject>;

const Placeholder = styled('div')(({ theme }) => ({
  width: '100%',
  border: '2px dashed pink',
  padding: 8,
  color: 'pink',
  textAlign: 'center'
}));

export function AttachmentsField(props: AttachmentsFieldProps) {
  const { name, onChange, onBlur, value, isDisabled } = props;
  const id = useId();

  return (
    <FormField<MediaObject>
      {...props}
      id={id}
      name={name}
      renderInput={(props) => <Placeholder>Attachments field</Placeholder>}
    />
  );
}
