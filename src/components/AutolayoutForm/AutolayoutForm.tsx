import React from 'react';
import { RippleOptions } from '../../hooks';
import { FormDefinition } from '../../types';
import { Form } from '../Form';

export type AutolayoutFormProps = {
  form: FormDefinition;

  options?: Partial<RippleOptions>;
};

/**
 * An autolayout form handles automatic rendering of the table of contents,
 * pages, and form questions according to the provided `FormDefinition`.
 *
 * Pages are laid out in the order defined in `FormDefinition.pages`
 * and fields are laid out in the order defined in `FieldDefinition.fields`.
 */
export function AutolayoutForm(props: AutolayoutFormProps) {
  return (
    <Form {...props} />
  );
}
