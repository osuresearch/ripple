import { mergeProps } from '@osuresearch/ui';
import React from 'react';
import { useController } from 'react-hook-form';

import { useRippleContext } from './useRippleContext';
import { FieldComponentType } from '../react';
import { useCollab } from './useCollab';
import { useFieldComponent } from './useFieldComponent';
import { FieldDefinition } from '../types';

export type UseRippleFieldReturn = {
  ref: (instance: any) => void;
  component: FieldComponentType<any>;
  componentProps: React.ComponentProps<any>;
};


export function useRippleField<T extends object = any>(
  name: string,
  def: FieldDefinition,
): UseRippleFieldReturn {
  const { selector, setValue, control } = useRippleContext();
  const [ component, props ] = useFieldComponent<T>(def);
  const [ setCollabValue ] = useCollab(name);

  const interactionMode = selector((state) => state.settings.interactionMode);

  // const { onChange, ...registerProps } = register(key, {
  //   disabled: interactionMode !== 'Edit'
  // });

  // TODO: Only enable the observer for specific fields.
  // E.g. we don't want observers on sections (unless we want
  // to show that collaborators are in sections?)

  // Wrap onChange with a Yjs node sync
  const handleChange = async (value: any) => {
    setValue(name, value);
    setCollabValue(value);
    // Pass down to RHF onChange.
    // onChange && onChange(value);
  };

  // useEffect(() => {
  //   console.log('hook register');
  //   register(key, {
  //     disabled: interactionMode !== 'Edit'
  //   });
  // }, [key, register, interactionMode]);

  const { field: { ref, onChange, onBlur, value } } = useController({ name, control });

  console.log(name, value);

  return {
    ref,
    component,
    componentProps: mergeProps(
      props,
      // registerProps,
      {
        onBlur: onBlur,
        onChange: onChange,
        value: value,
        isDisabled: interactionMode !== 'Edit',
        // isDisabled: true,
      }
      // register(name, {
      //   disabled: interactionMode !== 'Edit'
      // }),


      // {
      //   onChange: handleChange,
      //   value: value ?? undefined
      // }
    )
  };
}
