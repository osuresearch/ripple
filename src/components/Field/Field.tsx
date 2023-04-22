import React, { ComponentType, useContext } from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';
import { Markdown } from '../Markdown';

import { BaseFieldProps, ChoiceFieldProps, ValueFieldProps } from '../../react';
import { useRippleField } from '../../hooks/useRippleField';
import { ValueFieldRenderer } from './ValueFieldRenderer';
import { ChoiceFieldRenderer } from './ChoiceFieldRenderer';
import { Conditional } from '../Conditional';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { usePageContext } from '../../hooks/usePageContext';
import { FieldName } from '../../types';

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

  variant?: 'tableCell'
};

/**
 * Ripple field
 */
export function Field({ name, variant }: FieldProps) {
  const { page } = usePageContext();

  const parts = name.split('.');
  const localFieldName = parts[parts.length - 1];

  const definition = page.fields[localFieldName];
  if (!definition) {
    throw new Error(`Could not retrieve definition for field '${localFieldName}.' Full named path was '${name}'`);
  }

  const { ref, component, componentProps } = useRippleField(name, definition);
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
    placeholder: definition.placeholder,
    errorMessage: error?.message as string,
    // isRequired: !!definition?.required,
    necessityIndicator: !!definition?.required,
    diff: diffMode !== 'Current' ? diffMode : undefined
  };

  const label = (
    // Using data tags for targetting fields as we can't guarantee that a
    // developer won't place multiple instances of the form in the same DOM.
    <span data-ripple-field={name}>
      <Markdown text={definition.label} />
    </span>
  );
  const description = <Markdown text={definition.description} />;

  if (variant !== 'tableCell') {
    fieldProps.label = label;
    fieldProps.description = description;
  }
  else {
    // TODO: No coercing the label type into a string here.
    // Unforseen consequences and all that jazz.
    fieldProps['aria-label'] = '' + label;
  }

  if (definition.choices) {
    // If there's choices, we need <Item> children to represent each choice.
    // We assume all RUI choice components behave the same way by default.
    // TODO: Don't assume, verify.
    return (
        <Conditional name={name} condition={definition.condition}>
          <ChoiceFieldRenderer
            ref={ref}
            as={component as ComponentType<ChoiceFieldProps<any>>}
            {...fieldProps}
            {...componentProps}
            choices={definition.choices}
          />
        </Conditional>
    );
  }

  return (
    <Conditional name={name} condition={definition.condition}>
      <ValueFieldRenderer
        ref={ref}
        as={component as ComponentType<ValueFieldProps<any>>}
        {...fieldProps}
        {...componentProps}
      />
    </Conditional>
  );
}
