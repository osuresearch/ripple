import { Alert, mergeProps } from '@osuresearch/ui';
import React from 'react';
import { Collection } from '../components/Collection';
import { defaultComponent, FieldComponentProps, FieldComponentType } from '../react';
import { useRippleContext } from './useRippleContext';

export type UseRippleFieldReturn = {
  component: FieldComponentType<any>;
  componentProps: React.ComponentProps<any>;
};

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

export function useRippleField<T extends object = any>(
  name: string,
  def: FieldDefinition,
  instance?: string
): UseRippleFieldReturn {
  const { options, register, selector } = useRippleContext();

  const interactionMode = selector((state) => state.settings.interactionMode);

  let component: FieldComponentType<T> | undefined = undefined;
  let props: React.ComponentProps<any> = {};

  if (def.type === 'Collection') {
    component = Collection;
  } else if (def.component) {
    if (options.components[def.component.name]) {
      component = options.components[def.component.name];
      props = def.component.props ?? {};
    } else {
      component = InvalidField;
      props = {
        error: `Custom component '${def.component.name}' missing from Ripple options`
      };
    }
  } else {
    // Attempt to use the default built-in renderer
    component = defaultComponent[def.type as keyof typeof defaultComponent];
    if (!component) {
      component = InvalidField;
      props = {
        error: `No built-in component for field type '${def.type}'`
      };
    }
  }

  const registerProps = register(instance ? `${instance}.${name}` : name, {
    disabled: interactionMode !== 'Edit'
  });

  return {
    component,
    componentProps: mergeProps(props, registerProps)
  };
}
