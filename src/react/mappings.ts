
import {
  CheckboxField,
  TextField,

  DateField,
  CheckboxSetField,
  NumberField,
  TextAreaField,
  YesNoField,
  RadioSetField
} from '@osuresearch/ui';

import { Section } from '../components/Section';
import { SignatureField } from '../components/SignatureField/SignatureField';
import { InlineCollection } from '../components/InlineCollection';
import { FieldType } from '../types';
import { FieldComponentType } from './types';

/**
 * Mapping between a Ripple atomic and default RUI component
 */
export const defaultComponent: Record<FieldType, FieldComponentType<any> | undefined> = {
  Text: TextAreaField,
  Boolean: YesNoField,

  // TODO: Fix these type incompatibilities.
  // Forcing 'any' to make it build for now which *works* but is error prone.
  Person: TextField as any,

  Key: RadioSetField,
  KeyArray: CheckboxSetField,

  Flag: CheckboxField,
  FlagArray: CheckboxSetField,

  Date: DateField,
  Attachment: undefined, // AttachmentsField

  Number: NumberField,
  NumberRange: undefined, // RangeField?

  Signature: SignatureField,

  Section: Section,
  Collection: InlineCollection,
};
