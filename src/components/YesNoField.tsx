import React, { Key, forwardRef, useContext, useRef } from 'react';
import { useRadio } from 'react-aria';
import { Button, RadioSetContext, FormFieldBase, Item, VisuallyHidden, GroupItemSlotProps } from '@osuresearch/ui';
import { RadioSetField } from './RadioSetField';

export type YesNoFieldProps = FormFieldBase<boolean>;

/**
 * A specialized radio set with Yes and No toggle buttons.
 *
 * This supports an `undefined` value for unanswered fields.
 *
 * <!-- @ruiAtomic Boolean -->
 */
export const YesNoField = forwardRef<HTMLDivElement, YesNoFieldProps>((props, ref) => {
  const { defaultValue, value, onChange } = props;

  return (
    <div>
      value: [{convertYesNoToString(value)}]
      <RadioSetField
        ref={ref}
        {...props}
        value={convertYesNoToString(value)}
        defaultValue={convertYesNoToString(defaultValue)}
        onChange={(value) => onChange && onChange(convertStringToYesNo(value))}
        itemSlot={YesNoGroupItemSlot}
        itemLayout="horizontal"
      >
        <Item key="yes">Yes</Item>
        <Item key="no">No</Item>
      </RadioSetField>
    </div>
  );
});

function YesNoGroupItemSlot({ node, ...props }: GroupItemSlotProps) {
  const state = useContext(RadioSetContext);
  const ref = useRef<HTMLInputElement>(null);

  const isDisabled = state.isDisabled || state.disabledKeys.has(node.key);

  const { inputProps, isSelected } = useRadio(
    {
      ...props,
      value: '' + node.key,
      isDisabled,
      children: node.rendered,
    },
    state,
    ref
  );

  return (
    <Button as="label" variant={isSelected ? 'primary' : 'default'} isDisabled={isDisabled}>
      <VisuallyHidden>
        <input {...inputProps} />
      </VisuallyHidden>
      {node.rendered}
    </Button>
  );
}

function convertYesNoToString(value?: boolean): string | undefined {
  if (value) {
    return 'yes';
  }

  if (value === false) {
    return 'no';
  }

  return undefined;
}

function convertStringToYesNo(value?: string): boolean | undefined {
  if (value === 'yes') {
    return true;
  }

  if (value === 'no') {
    return false;
  }

  return undefined;
}
