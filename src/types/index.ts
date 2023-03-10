// TypeScript-based form data.
// Replicate: https://code.osu.edu/ORIS/flow/-/blob/v2-dev/src/Integration/GraphQL/types.gql

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DiffMode = 'Current' | 'Unified' | 'SideBySide';

type LayoutMode = 'Paged' | 'Single';

type InteractionMode = 'Edit' | 'Read' | 'Review';

/**
 * GitHub-flavored markdown text
 */
type Markdown = string;

/**
 * React component to use in place of the default field renderer.
 *
 * You can pass through additional props to the component.
 */
type ReactFieldComponent = {
  name: string;
  props?: any;
};

type ChoiceKey = string;
type ChoiceValue = string;

type ChoicesList = Record<ChoiceKey, ChoiceValue>;

// Basically osuresearch/atomics
const atomic = [
  'Text',
  'Boolean',
  'Number',
  'NumberRange',
  'Flag',
  'FlagArray',
  'Key',
  'KeyArray',
  'Person',
  'Date',
  'File'
] as const;

type Atomic = (typeof atomic)[number];

// Really should be a mapping between atomic type -> value.
// But that's future atomics work.
type AtomicValue = string | number | string[] | number[] | boolean;

const reservedNames = ['title', 'id', 'required'] as const;
type ReservedNames = (typeof reservedNames)[number];

type PageName = Exclude<string, keyof ReservedNames>;
type FieldName = Exclude<string, keyof ReservedNames>;

type Validator = {
  // required: Input your ZIP code
};

// ------------------------------------
// | Question: Label/instructions for a field this depends on
// | Answer:   "No"
// | - AND -
// | Question: (Page Name) Other question label field
// | Answer:   100 (> 13)
// ------------------------------------

/**
 * Expression to be evaluated as a condition.
 *
 * TOOD: Long documentation about this, filtrex, and such.
 */
type Condition = string;

/**
 * Properties common across all types of fields
 */
type BaseField = {
  /**
   * Primary label for the field.
   */
  label: Markdown;

  /**
   * Additional secondary help text to display alongside the field.
   *
   * Depending on how field components are rendered, this may appear
   * either under the field input or in a popover dialog.
   */
  description?: Markdown;

  /**
   * Simple "is this field required" validation rule.
   *
   * If the value is a string, the error message presented for the
   * field will contain the message.
   *
   * If a string is provided, the field is checked for any response
   * (non-null and non-empty value). If no response is provided,
   * the string will be used as the validation error message.
   *
   * If omitted, the response is optional.
   */
  required?: string;

  /**
   * Frontend and backend validation rules for this field.
   *
   * Some validation rules may help block saving the field's response
   * until valid, and some may be passive validation that prevents the
   * form in its entirety from saving but not an individual response.
   */
  validators?: Validator[];

  /**
   * Condition for displaying this field based on existing responses
   */
  condition?: Condition;
};

/**
 * A set of instanced pages, each matching the same page
 * template and with their own set of responses.
 */
type CollectionField = {
  type: 'Collection';

  /**
   * Page definition to instantiate for new instances
   */
  template: PageDefinition;

  component?: never;
  choices?: never;
};

/**
 * A divider that separates and groups like-fields.
 *
 * Typically presented as a semantic header in the DOM
 * and may be used for generating automatic navigation
 * within a page.
 */
type SectionField = {
  type: 'Section'
  template?: never;
  component?: never;
  choices?: never;
}

/**
 * An explicit question and response
 */
type AtomicField = {
  type: Atomic;
  choices?: ChoicesList;

  /**
   * Optional RUI field component to render.
   *
   * If omitted Ripple will attempt to intelligently
   * determine which RUI field component to render.
   */
  component?: ReactFieldComponent;

  template?: never;
};

type FieldDefinition = BaseField & (AtomicField | CollectionField | SectionField);

type PageDefinition = {
  title: string;
  description?: Markdown;
  condition?: Condition;

  fields: Record<FieldName, FieldDefinition>;
};

type FormDefinition = {
  title: string;
  version: string;

  pages: { [name: PageName]: PageDefinition };
};

// Responses are their own data type.
// This is the transformation of backend storage ->  form data.
// Should also be able to feed directly into RHF 7.

type FieldResponse =
  | AtomicValue
  | {
      // collection instances by key
      [key: string]: PageResponses;
    };

type PageResponses = {
  [name: FieldName]: FieldResponse;
};

// type FormResponses<T, K extends { [K in keyof T]: T[K] extends string ? K : never}[keyof T]>= {
// type FormResponses<T> = {
//   t: T
//   form: FormDefinition
//   responses: Record<FieldName, FieldResponse>
// }

type FormResponses = Record<FieldName, FieldResponse>;

type FieldReferenceSet = {
  [x: FieldName]: [FieldDefinition, PageDefinition] | [undefined, undefined];
};

/**
 * Person Atomic from osuresearch/atomics (pending)
 */
type Person = {
  id: string;
  name: string;
  username: string;
  email?: string;
};
