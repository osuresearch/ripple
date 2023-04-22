import React from 'react';
import { Alert } from '@osuresearch/ui';
import { FieldComponentType, FieldComponentProps } from "../react";
import { useRippleContext } from "./useRippleContext";
import { FieldDefinition } from '../types';

type InvalidFieldProps = FieldComponentProps<any> & {
  error?: string;
};

function InvalidField(props: InvalidFieldProps) {
  return (
    <Alert variant="error" title={`Missing field component for '${props.name}'`}>
      {props.error}
    </Alert>
  );
}

type UseFieldComponentReturn<T> = [FieldComponentType<T>, any];

/**
 * Construct a React component to render the input `FieldDefinition`.
 *
 * If a component cannot be created, a placeholder component will be
 * provided to alert the end user.
 */
export function useFieldComponent<T extends object = any>(def: FieldDefinition): UseFieldComponentReturn<T> {
  const { options } = useRippleContext();

  let component: FieldComponentType<T> | undefined = undefined;
  let props: React.ComponentProps<any> = {};

  props = def.component?.props ?? {};

  // If the definition supplied a custom named component, try to use that.
  if (def.component?.name) {
    if (options.components[def.component.name]) {
      component = options.components[def.component.name];
    }
    else {
      component = InvalidField;
      props = {
        error: `No configured component for field type '${def.component.name}'`
      };
    }
  }
  else {
    // Use the default from the mapping configuration
    component = options.components[def.type as keyof typeof options.components];
  }

  if (!component) {
    component = InvalidField;
    props = {
      error: `Could not locate a component for field type '${def.type}'`
    };
  }

  return [component, props];
}
