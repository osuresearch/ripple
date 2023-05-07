// TypeScript-based form data.
// Replicate: https://code.osu.edu/ORIS/flow/-/blob/v2-dev/src/Integration/GraphQL/types.gql

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DiffMode = 'Current' | 'Unified' | 'SideBySide';

export type LayoutMode = 'Paged' | 'Single';

export type InteractionMode = 'Edit' | 'Read' | 'Review';

/**
 * GitHub-flavored markdown text
 */
export type MarkdownText = string;

/**
 * Generate markdown composed of response data.
 */
export type MarkdownFactory = ((responses: FormResponses) => MarkdownText);

/**
 * Mustache template text
 */
export type Mustache = string;

/**
 * React component to use in place of the default field renderer.
 *
 * You can pass through additional props to the component.
 */
export type ReactFieldComponent = {
  /**
   * Name of the custom component.
   *
   * If omitted, the default component will be used and the props
   * will be passed through to customize that component.
   */
  name?: string;

  /**
   * Props to pass through to the component.
   *
   * This should only ever be simple values that can render on both
   * the server and client side or be passed through APIs. For example,
   * strings, booleans, simple JavaScript objects and arrays are okay.
   * React components or callables are not.
   */
  props?: any;
};

export type ChoiceKey = string;
export type ChoiceValue = string;

export type ChoicesList = Record<ChoiceKey, ChoiceValue>;

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
  'Attachment',
  'Signature',
] as const;

export type Atomic = (typeof atomic)[number];

// Really should be a mapping between atomic type -> value.
// But that's future atomics work.
export type AtomicValue = string | number | string[] | number[] | boolean;

const reservedNames = ['title', 'id', 'required'] as const;
export type ReservedNames = (typeof reservedNames)[number];

export type CollectionInstanceId = string;
export type PageName = Exclude<string, keyof ReservedNames>;
export type FieldName = Exclude<string, keyof ReservedNames>;

export type FieldType = Atomic | 'Section' | 'Collection';

export type Validator = {
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
export type Condition = string;

/**
 * Properties common across all types of fields
 */
export type BaseField = {
  /**
   * Primary label for the field.
   */
  label: MarkdownText;

  /**
   * Additional secondary help text to display alongside the field.
   *
   * Depending on how field components are rendered, this may appear
   * either under the field input or in a popover dialog.
   */
  description?: MarkdownText;

  /**
   * Content to display when there is no response to the field.
   *
   * Depending on the implementing component for the field, this
   * may or may not actually support Markdown format.
   */
  placeholder?: MarkdownText;

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
   * If true, this field is computed from the responses in other
   * fields and cannot be modified by the submitter.
   */
  computed?: boolean;

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

  /**
   * Example response value for demonstrating this field
   */
  example?: any;
};

/**
 * A set of instanced pages, each matching the same page
 * template and with their own set of responses.
 */
export type CollectionField = {
  type: 'Collection';

  /**
   * Page definition to instantiate for new instances
   */
  template: PageDefinition;

  /**
   * Summary content for each entry in the collection.
   *
   * This supports both markdown and Mustache for templating.
   *
   * Mustache variables will be derived from the field responses
   * within each instance being summarized.
   */
  summary?: MarkdownText | MarkdownFactory;

  /**
   * Optional component to render.
   *
   * If omitted, Ripple will use the default collection component.
   */
  component?: ReactFieldComponent;

  choices?: never;
};

/**
 * A section within a form to create a grouping of related fields.
 *
 * Will typically be rendered as a heading. Sections do not persist
 * with form response data.
 */
export type SectionField = {
  type: 'Section',

  /**
   * Optional component to render.
   *
   * If omitted, Ripple will use the default section component.
   */
  component?: ReactFieldComponent;

  choices?: never;
  template?: never;
  summary?: never;
}

/**
 * An explicit question and response
 */
export type AtomicField = {
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
  summary?: never;
};

export type FieldDefinition = BaseField & (AtomicField | CollectionField | SectionField);

export type FieldList = Record<string, FieldDefinition>;
export type FieldKeys = keyof FieldList;

export type PageDefinition = {
  title: string;
  description?: MarkdownText;
  condition?: Condition;

  fields: FieldList;
};

export type FormDefinition = {
  title: string;
  version: string;

  pages: Record<PageName, PageDefinition>;
};

// Responses are their own data type.
// This is the transformation of backend storage ->  form data.
// Should also be able to feed directly into RHF 7.

export type FieldResponse =
  | AtomicValue
  | {
      // collection instances by key
      [key: string]: PageResponses;
    };

export type PageResponses = {
  [name: FieldName]: FieldResponse;
};

// type FormResponses<T, K extends { [K in keyof T]: T[K] extends string ? K : never}[keyof T]>= {
// type FormResponses<T> = {
//   t: T
//   form: FormDefinition
//   responses: Record<FieldName, FieldResponse>
// }

export type FormResponses = Record<FieldName, FieldResponse>;

export type FieldReferenceSet = {
  [x: FieldName]: [FieldDefinition, PageDefinition] | [undefined, undefined];
};

/**
 * Person Atomic from osuresearch/atomics (pending)
 */
export type Person = {
  id: string;
  name: string;
  username: string;
  email?: string;
};

export type TableOfContentsSection = {
  id: string
  title: string
  level: number
}

/**
 * Specialized error class for promises that may
 * be cancelled mid-work.
 */
class CancellationError extends Error {

}

export type RipplePersistenceProvider = {
  // TODO: What's passed in? What comes out?
  // Does this also handle data load or just save?

  save: (responses: FormResponses) => Promise<void>;

  // load - do we specify keys to load?
  // how about a preload state?
  // what about external sync / monitor / live updates?
  //    maybe that's an argument for load()? Live update
  //    callback of sorts.

  getResponses: (fields: FieldName[]) => Promise<FieldResponse[]>;
    // TODO: Collections...?
}

export type RippleLookupProvider<T extends LookupResult = LookupResult> = {

  /**
   * Get a list of supported datasets for this provider.
   *
   * Requests for lookups will route to this provider if the
   * field matches a provided key.
   */
  keys: () => Promise<string[]>;

  /**
   * Resolve an autocomplete request for search terms.
   *
   * If the promise needs to be cancelled (e.g. due to throttling frequent
   * autocomplete requests) then throw a `CancellationError` and Ripple will
   * safely ignore the result.
   *
   * @param key   The key of the dataset to autocomplete against.
   *              Each field on a form may be associated with
   *              a different dataset (e.g. countries vs US states).
   * @param terms The user's search terms as they type.
   * @returns
   */
  autocomplete: (key: string, terms: string) => Promise<T[]>;

  /**
   * Resolve one or more known lookup values by ID.
   *
   * This is used to load previous response data from a Ripple
   * form that was already populated through a lookup.
   *
   * @param key   The key of the dataset to retrieve from.
   *              Each field on a form may be associated with
   *              a different dataset (e.g. countries vs US states).
   *
   * @param ids Result IDs that need to be resolved.
   *            Each ID MUST be resolved to a result.
   *
   *            If the source data in the dataset is no
   *            longer available, use the null object
   *            pattern for resolution and use validation
   *            to ensure that the value is updated by the
   *            user of the form before submission.
   * @returns
   */
  get: (key: string, id: string[]) => Promise<T[]>;

  /**
   * Retrieve *all* values for a dataset.
   *
   * This is used for Ripple fields that need to display
   * all possible values as part of the form.
   *
   * If the dataset is too large to support returning all
   * values, then throw (TODO: something?) to indicate that
   * the field must be refactored to a type that uses
   * autocomplete suggestions instead.
   *
   * @returns
   */
  all: (key: string) => Promise<T[]>;
}

export type RippleValidationProvider = {
  // TODO: what's passed in? What comes out?
}

export type LookupResult = {
  id: string
  value: string

  // TODO: Shape will change based on what we're looking up.
  // Can I standardize this in some way?
  // We need to lookup simple values (countries, states)
  // complex values like people, locations
  // and full form data like collection instances.
}
