import React from 'react';
import { ListProps } from 'react-stately';

import {
  CheckboxField,
  TextAreaField,
  TextField,
  YesNoField,
  DateField,
  RadioSetField,
  CheckboxSetField,
  FormFieldBase,
  NumberField
} from '@osuresearch/ui';
import { UseRippleFormRegisterReturn } from 'src/hooks/useRippleForm';
import { RefCallBack } from 'react-hook-form';

export type BaseFieldProps<T> = {
  name?: FieldName;
  label: React.ReactNode;
  description: React.ReactNode;

  validationState?: 'invalid' | 'valid';
  errorMessage?: React.ReactNode;
  necessityIndicator?: boolean;

  isRequired?: boolean;
  isDisabled?: boolean;
  diff?: DiffMode;

  value?: T;
  onChange?: (value: T) => void;
  onBlur?: (e: React.FocusEvent) => void;

  children: any;
};

export interface PreviousValueBase<T> {
  previousValue?: T;
}

export interface PreviousCollectionBase<T> {
  previousValue?: T;

  /** Previous items objects in the collection. */
  previousItems?: Iterable<T>;
}

export type ValueFieldProps<T> = BaseFieldProps<T> & PreviousValueBase<T>;

export type ChoiceFieldProps<T> = BaseFieldProps<T> & ListProps<any> & PreviousCollectionBase<any>;

export type FieldComponentProps<T> = BaseFieldProps<T> & (ChoiceFieldProps<T> | ValueFieldProps<T>);

export type FieldComponentType<T> = React.ComponentType<FieldComponentProps<T>>;

/**
 * Mapping between a Ripple atomic and default RUI component
 */
export const defaultComponent: Record<Atomic, FieldComponentType<any> | undefined> = {
  Text: TextAreaField,
  Boolean: YesNoField,
  Person: TextField,

  Key: RadioSetField,
  KeyArray: CheckboxSetField,

  Flag: CheckboxField,
  FlagArray: CheckboxSetField,

  Date: DateField,
  File: undefined, // FilesField

  Number: NumberField,
  NumberRange: undefined // RangeField?
};
