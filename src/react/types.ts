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
import { TextEditor } from '../components/TextEditor';
import { Section } from '../components/Section';

export type BaseFieldProps<T> = {

  // TODO: This is only optional for compat with a react-aria
  // feature we don't use. Need to somehow make it stricter
  // while dropping react-aria's nonsense.
  name?: string;

  label: React.ReactNode;
  description?: React.ReactNode;

  /**
   * Placeholder content if the field has not been filled out.
   *
   * This must be a string to support inserting placeholder
   * text within native `input` elements.
   */
  placeholder?: string;

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
export const defaultComponent: Record<FieldType, FieldComponentType<any> | undefined> = {
  // Text: TextAreaField,
  Text: TextEditor,
  Boolean: YesNoField,
  Person: TextField,

  Key: RadioSetField,
  KeyArray: CheckboxSetField,

  Flag: CheckboxField,
  FlagArray: CheckboxSetField,

  Date: DateField,
  File: undefined, // FilesField

  Number: NumberField,
  NumberRange: undefined, // RangeField?

  Section: Section,

  Collection: undefined,
};
