export type ValidationResult = {
  state: 'incomplete' | 'valid' | 'invalid';
  message?: string;
};

export interface IValidator {
  validate: (field: FieldDefinition) => ValidationResult[];
}

// Port other validators from the PHP Flow impl
// https://code.osu.edu/ORIS/flow/-/tree/v2-dev/src/Validator
