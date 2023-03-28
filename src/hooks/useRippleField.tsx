import { Alert, mergeProps } from '@osuresearch/ui';
import React, { useState, useEffect } from 'react';
import { YTextEvent } from 'yjs';
import { Collection } from '../components/Collection';
import { defaultComponent, FieldComponentProps, FieldComponentType } from '../react';
import { useRippleContext } from './useRippleContext';
import { useDebouncedState } from './useDebouncedState';

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
  const { doc, options, register, selector, watch, setValue } = useRippleContext();

  const interactionMode = selector((state) => state.settings.interactionMode);

  let component: FieldComponentType<T> | undefined = undefined;
  let props: React.ComponentProps<any> = {};

  const key = instance ? `${instance}.${name}` : name;

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

  // const { onChange, ...registerProps } = register(key, {
  //   disabled: interactionMode !== 'Edit'
  // });

  // TODO: Only enable the observer for specific fields.
  // E.g. we don't want observers on sections (unless we want
  // to show that collaborators are in sections?)

  const [ynode, setYNode] = useState(doc.getText(key));

  useEffect(() => {
    console.log('hook observer');
    const observer = (e: YTextEvent) => {
      setValue(key, e.target.toString(), {
        shouldValidate: true,
        shouldDirty: true
      });
    };

    ynode.observe(observer);
    return () => ynode.unobserve(observer);
  }, [ynode]);

  const value = watch(key);

  const [debouncedValue, setDebouncedValue] = useDebouncedState('', 200);

  // Fire off a Yjs sync whenever our debounced value is updated
  useEffect(() => {
    if (Array.isArray(value)) {
    } else if (typeof value === 'string') {
      // TODO: Be smart about insertions.
      if (ynode.length > 0) ynode.delete(0, ynode.length);

      ynode.insert(0, value);
      console.debug(ynode);
    } else if (typeof value === 'number') {
    } else {
      // ???
    }
  }, [debouncedValue]);

  // Wrap onChange with a Yjs node sync
  const handleChange = async (value: any) => {
    setValue(key, value);
    setDebouncedValue(value);
    // Pass down to RHF onChange.
    // onChange && onChange(value);
  };

  useEffect(() => {
    console.log('hook register');
    register(key, {
      disabled: interactionMode !== 'Edit'
    });
  }, [key, register, interactionMode]);

  return {
    component,
    componentProps: mergeProps(
      props,
      // registerProps,
      {
        onChange: handleChange,
        value: value ?? undefined
      }
    )
  };
}
