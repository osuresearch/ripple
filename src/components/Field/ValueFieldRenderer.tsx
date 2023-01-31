import React, { ComponentType } from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';
import { ValueFieldProps, BaseFieldProps } from '../../react';

export type ValueFieldRendererProps = BaseFieldProps & {
  as: ComponentType<ValueFieldProps>;
};

export function ValueFieldRenderer({ as: Component, ...props }: ValueFieldRendererProps) {
  const {
    selector,
    formState: { errors }
  } = useRippleContext();

  const diffMode = selector((state) => state.settings.diffMode);

  return (
    <>
      {/* {diffMode} */}
      <Component {...props} />
    </>
  );
}
