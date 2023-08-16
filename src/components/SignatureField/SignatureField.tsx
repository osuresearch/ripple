import React, { useId } from 'react';
import { styled } from '@mui/material';
import { FormField } from '@osuresearch/ui';

import { BaseFieldProps } from '../../react';

// What would the type even be here? Base64 image?
export type Signature = string;

export type SignatureFieldProps = BaseFieldProps<Signature>;

const Placeholder = styled('div')(({ theme }) => ({
  width: '100%',
  border: '2px dashed pink',
  padding: 8,
  color: 'pink',
  textAlign: 'center'
}));

export function SignatureField(props: SignatureFieldProps) {
  const { name, onChange, onBlur, value, isDisabled } = props;
  const id = useId();

  // TODO:
  // https://embiem.github.io/react-canvas-draw/
  // I actually like this version of it

  return (
    <FormField<Signature>
      {...props}
      id={id}
      name={name}
      renderInput={(props) => <Placeholder>Signature field</Placeholder>}
    />
  );
}
