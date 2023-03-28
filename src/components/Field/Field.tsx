import React, { ComponentType, useContext } from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';
import { context } from '../Page';
import { Markdown } from '../Markdown';

import { BaseFieldProps, ChoiceFieldProps, ValueFieldProps } from '../../react';
import { useRippleField } from '../../hooks/useRippleField';
import { ValueFieldRenderer } from './ValueFieldRenderer';
import { ChoiceFieldRenderer } from './ChoiceFieldRenderer';
import { Conditional } from '../Conditional';
import { Chip, Stack, Text } from '@osuresearch/ui';
import { useResizeObserver } from '../../hooks/useResizeObserver';

export type FieldProps = {
  /**
   * Form field name to bind.
   *
   * This can either be a simple field name or a
   * dot-delimited path to a field stored within
   * a collection instance.
   *
   * Examples:
   * - `fieldName`
   * - `fieldName1.[collectionId1].fieldName2`
   */
  name: FieldName;

  instance?: string;
};

/**
 * Ripple field
 */
export function Field({ name, instance }: FieldProps) {
  const ctx = useRippleContext();
  const { name: pageName, page } = useContext(context);

  // Extract field from form responses and form definition.
  // If the field has a condition associated with it, evaluate
  //  (or pull cached evaluation)

  // If the field hasn't been loaded yet (no response data from backend,
  //  no definition, etc) - add it to the batch of fields to pull down.
  //  This also should account for any condition fields it depends on
  //  to be pulled down.

  // If loading response data, placeholder it or persist as read-only
  // until available for editing. (every RUI field should have a skeleton state, tbh)

  // TODO: Can be null if the field is invalid
  const definition = page.fields[name];

  const { component, componentProps } = useRippleField(name, definition, instance);
  const {
    selector,
    formState: { errors }
  } = useRippleContext();

  const diffMode = selector((state) => state.settings.diffMode);
  const interactionMode = selector((state) => state.settings.interactionMode);

  // honestly, diff handling should be here instead.
  // In case we need to do unified diff on labels and descriptions.

  const error = errors[name];

  // TODO: Should be in the hook too tbh
  const fieldProps: Partial<BaseFieldProps<any>> = {
    name,
    label: (
      // Using data tags for targetting fields as we can't guarantee that a
      // developer won't place multiple instances of the form in the same DOM.
      <span data-ripple-field={name}>
        <Chip variant="outline" c="pink" style={{ float: 'right' }}>field: {name}</Chip>
        <Markdown text={definition.label} />
      </span>
    ),
    description: <Markdown text={definition.description} />,
    placeholder: definition.placeholder ? <Markdown text={definition.placeholder} /> : undefined,
    errorMessage: error?.message as string,
    // isRequired: !!definition?.required,
    necessityIndicator: !!definition?.required,
    diff: diffMode !== 'Current' ? diffMode : undefined
  };

  // if (!definition) {
  //   return (
  //     <Alert variant="error" title="Missing definition">
  //       Cannot load definition for field {name} on page {pageName}
  //     </Alert>
  //   );
  // }

  // // Find a field component to resolve for rendering
  // const component = defaultComponent[definition.type as keyof typeof defaultComponent];
  // if (!component) {
  //   return (
  //     <Alert variant="error" title="Missing field component">
  //       Cannot load field component for field {name} on page {pageName}:
  //       no field component is assigned to definition type {definition.type}
  //     </Alert>
  //   )
  // }

  // TODO: Custom component render prop support for edge cases.

  // --- everything below is default rendering behaviour ---

  const [ref, rect] = useResizeObserver<HTMLDivElement>();

  if (definition.choices) {
    // If there's choices, we need <Item> children to represent each choice.
    // We assume all RUI choice components behave the same way by default.
    // TODO: Don't assume, verify.
    return (
      // <Anchor name={(instance ?? '') + name}>
        <Conditional name={name} condition={definition.condition}>
          <ChoiceFieldRenderer
            as={component as ComponentType<ChoiceFieldProps<any>>}
            {...fieldProps}
            {...componentProps}
            choices={definition.choices}
          />
        </Conditional>
      // </Anchor>
    );
  }

  return (
    <Conditional name={name} condition={definition.condition}>
      {/* <Anchor name={(instance ?? '') + name}> */}
        <ValueFieldRenderer
          as={component as ComponentType<ValueFieldProps<any>>}
          {...fieldProps}
          {...componentProps}
        />
      {/* </Anchor> */}
    </Conditional>
  );
}
