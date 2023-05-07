import React from 'react';
import { MediaObject } from '@osuresearch/types';
import { BaseFieldProps } from "../../react";
import { FormField, Paper } from '@osuresearch/ui';
import styled from 'styled-components';

export type AttachmentsFieldProps = BaseFieldProps<MediaObject> & {

}

const Placeholder = styled.div`
  width: 100%;
  border: 2px dashed var(--rui-dark);
  padding: var(--rui-spacing-xxl);
  color: var(--rui-dark);
  text-align: center;
`

export function AttachmentsField(props: AttachmentsFieldProps) {

  const { name, onChange, onBlur, value, isDisabled } = props;

  return (
    <FormField<MediaObject>
      labelProps={{}}
      descriptionProps={{}}
      errorMessageProps={{}}
      {...props}
      name={name}
    >
      <Placeholder>Attachments field</Placeholder>
    </FormField>
  )
}
