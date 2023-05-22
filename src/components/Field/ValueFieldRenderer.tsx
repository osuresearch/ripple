import React, { ComponentType, forwardRef } from 'react';
import { Chip } from '@osuresearch/ui';
import { useRippleContext } from '../../hooks/useRippleContext';
import { ValueFieldProps, BaseFieldProps } from '../../react';
import styled from 'styled-components';
import { Debug } from '../Debug';
import { useRippleSelector } from '../../hooks';

export type ValueFieldRendererProps<T> = BaseFieldProps<T> & {
  as: ComponentType<ValueFieldProps<T>>;
};

const DebugWrapper = styled.div`
  position: absolute;
  left: calc(100% + 16px);
  white-space: nowrap;
`
// export function ValueFieldRenderer2<T> = forwardRef<HTMLElement, ValueFieldRendererProps<T>>((
//   { as: Component, ...props },
//   ref
// ) => {

// })

export function ValueFieldRenderer<T>({ as: Component, ...props }: ValueFieldRendererProps<T>) {
  const {
    formState: { errors }
  } = useRippleContext();

  const diffMode = useRippleSelector((state) => state.settings.diffMode);

  return (
    <div className="rui-relative">
      <Debug>
        <DebugWrapper>
          <Chip variant="indicator" c="pink">field: {props.name}</Chip>
        </DebugWrapper>
      </Debug>

      <Component {...props} />
    </div>
  );
}
