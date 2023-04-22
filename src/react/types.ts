import React from 'react';
import { ListProps } from 'react-stately';
import { DiffMode } from '../types';

export type PageDeepLink = {
  label: React.ReactNode;
  href: string;
}

export type BaseFieldProps<T> = {
  name: string;

  label: React.ReactNode;
  description?: React.ReactNode;

  'aria-label'?: string;

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
  onChange?: (value: T | undefined) => void;
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
