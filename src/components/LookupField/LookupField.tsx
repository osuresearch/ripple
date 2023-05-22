import React, { useRef } from 'react';
import { FormField } from '@osuresearch/ui';
import { useTextField } from 'react-aria';
import { BaseFieldProps } from '../../react';

export type LookupFieldProps = BaseFieldProps<string> & {

}

/**
 * The lookup field acts as a standardized purpose dataset lookup.
 *
 * If you have a field definition that includes a lot of choices,
 * or choices that are dynamically generated from an external
 * data source, you can use the lookup field as an alternative
 * data entry method.
 *
 * Use cases include:
 *
 * - Mailing addresses
 * - Employee searches
 * - Large datasets e.g. lists of FDA approved drugs or devices
 * - Generative data e.g. dependent on responses elsewhere in the form
 */
export function LookupField(props: LookupFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { name, onChange, onBlur, value, isDisabled } = props;

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, inputRef);

  return (
    <FormField<string>
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      {...props}
      name={name}
    >
      <>lookup things</>
    </FormField>
  );
}
