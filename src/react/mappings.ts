
import {
  CheckboxField,
  TextField,
  YesNoField,
  DateField,
  RadioSetField,
  CheckboxSetField,
  NumberField
} from '@osuresearch/ui';

import { TextEditor } from '../components/TextEditor';
import { Section } from '../components/Section';
import { SignatureField } from '../components/SignatureField/SignatureField';
import { InlineCollection } from '../components/InlineCollection';
import { FieldType } from '../types';
import { FieldComponentType } from './types';

/**
 * Mapping between a Ripple atomic and default RUI component
 */
export const defaultComponent: Record<FieldType, FieldComponentType<any> | undefined> = {
  // Text: TextAreaField,
  Text: TextEditor,
  Boolean: YesNoField,

  // TODO: Fix these type incompatibilities.
  // Forcing 'any' to make it build for now which *works* but is error prone.
  Person: TextField as any,

  Key: RadioSetField as any,
  KeyArray: CheckboxSetField as any,

  Flag: CheckboxField,
  FlagArray: CheckboxSetField as any,

  Date: DateField as any,
  Attachment: undefined, // AttachmentsField

  Number: NumberField,
  NumberRange: undefined, // RangeField?

  Signature: SignatureField,

  Section: Section,
  Collection: InlineCollection,
};
