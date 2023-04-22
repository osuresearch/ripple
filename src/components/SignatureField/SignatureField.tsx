import React, { useRef } from 'react';
import { FormField } from '@osuresearch/ui';
import { useTextField } from 'react-aria';
import { BaseFieldProps } from '../../react';

// What would the type even be here? Base64 image?
export type Signature = string

export type SignatureFieldProps = BaseFieldProps<Signature> & {

}

export function SignatureField(props: SignatureFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { name, onChange, onBlur, value, isDisabled } = props;

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, inputRef);

  // TODO:
  // https://embiem.github.io/react-canvas-draw/
  // I actually like this version of it

  return (
    <FormField<Signature>
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      {...props}
      name={name}
    >
      <>signature things</>
    </FormField>
  )
}
