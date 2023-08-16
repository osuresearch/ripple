import React, { ComponentType } from 'react';
import { useRippleContext } from '../../hooks/useRippleContext';
import { ValueFieldProps, BaseFieldProps } from '../../react';
import { useRippleSelector } from '../../hooks';
import { Debug } from '../Debug';
import { Stack } from '@mui/material';

export type ValueFieldRendererProps<T> = BaseFieldProps<T> & {
  as: ComponentType<ValueFieldProps<T>>;
};

// const DebugWrapper = styled.div`
//   position: absolute;
//   left: calc(100% + 16px);
//   white-space: nowrap;
// `
// // export function ValueFieldRenderer2<T> = forwardRef<HTMLElement, ValueFieldRendererProps<T>>((
// //   { as: Component, ...props },
// //   ref
// // ) => {

// // })

export function ValueFieldRenderer<T>({ as: Component, ...props }: ValueFieldRendererProps<T>) {
  const {
    formState: { errors }
  } = useRippleContext();

  const diffMode = useRippleSelector((state) => state.settings.diffMode);

  return (
    <Stack alignItems="stretch" id="hi">
      <Debug>
        <div>
          {props.name}
          {/* <Chip variant="indicator" c="pink">field: {props.name}</Chip> */}
        </div>
      </Debug>

      <Component {...props} />
    </Stack>
  );
}
