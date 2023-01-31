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
  FormFieldBase
} from '@osuresearch/ui';
import { UseRippleFormRegisterReturn } from 'src/hooks/useRippleForm';
import { RefCallBack } from 'react-hook-form';

export type BaseFieldProps = {
  name?: string;
  label: React.ReactNode;
  description: React.ReactNode;
  errorMessage?: React.ReactNode;
  isRequired?: boolean;
};

export type ValueFieldProps = BaseFieldProps;

export type ChoiceFieldProps = BaseFieldProps & ListProps<any>;

export type FieldRendererProps = BaseFieldProps & (ChoiceFieldProps | ValueFieldProps);

export type FieldComponentType = React.ComponentType<FieldComponentProps>;

export type FieldComponentProps = {
  name?: FieldName;

  label: React.ReactNode;
  description: React.ReactNode;

  validationState?: 'invalid' | 'valid';
  errorMessage?: React.ReactNode;

  value?: any;
  onChange?: (value: any) => void;
  onBlur?: (e: React.FocusEvent) => void;

  isDisabled?: boolean;
  isRequired?: boolean;

  children: any;
};

/**
 * Mapping between a Ripple atomic and default RUI component
 */
export const defaultComponent: Record<Atomic, FieldComponentType | undefined> = {
  Text: TextAreaField,
  Boolean: YesNoField,
  Person: TextField,

  Key: RadioSetField,
  KeyArray: CheckboxSetField,

  Flag: CheckboxField,
  FlagArray: CheckboxSetField,

  Date: DateField,
  File: undefined // FilesField
};
