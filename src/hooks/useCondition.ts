import { compileExpression, Options, useDotAccessOperator } from 'filtrex';
import { getReferencedFields, findField } from '../tools';
import { useRippleContext } from './useRippleContext';
import { FieldReferenceSet, Condition, FormResponses, FormDefinition } from '../types';

export type UseConditionReturn = {
  passed: boolean;
  error?: string;

  fields: string[];
  references: FieldReferenceSet;
  invalidFields: string[];
};


function evaluateCondition(form: FormDefinition, condition?: Condition, responses?: FormResponses) {
  if (!condition) {
    return {
      passed: true,
      fields: [],
      references: {},
      invalidFields: []
    };
  }

  const fields = getReferencedFields(condition);

  const references = fields.reduce<FieldReferenceSet>(
    (agg, name) => ((agg[name] = findField(form, name)), agg),
    {}
  );

  const invalidFields = Object.keys(references).filter((k) => !references[k as any][0]);

  const options: Options = {
    extraFunctions: {
      // strlen,
    },
    constants: {
      pi: Math.PI,
      true: true,
      false: false,
    },
    customProp: (
      propertyName: string, // name of the property being accessed
      get: (name: string) => any, // safe getter that retrieves the property from obj
      obj: any, // the object passed to compiled expression
      type: 'unescaped' | 'single-quoted'
    ) => {
      // TODO: Try/catch around this. Missing fields
      // should require either a backend fetch or a safe
      // falsy value to prevent form breakage (+ reporting errors)
      const value = useDotAccessOperator(propertyName, get, obj, type);

      // and not VARIABLE
      // should not evaluate when "Is PI lead" isn't answered.

      // Anything that isn't defined should be
      // placeholdered with `undefined` value so
      // the evaluator can still execute.

      // TODO: These are hacks for the YesNos until we safely type them to booleans.
      if (value === '0') {
        return false;
      }
      if (value === '1') {
        return true;
      }

      return value;
    }
  };


  // a.b.c = data['a.b.c'] not data.a.b.c

  // TODO: this.KEY will use `instance` as 'this' to find a path.

  let passed = false;
  let error: string | undefined = undefined;
  let filter: ((obj: any) => any) | undefined;

  // Compile expression
  try {
    filter = compileExpression(condition, options);
  } catch (e) {
    // TODO: Filtrex error transforms. See:
    // https://www.npmjs.com/package/filtrex
    if (e) {
      error = 'Compilation error: ' + e.toString();
    } else {
      error = 'Compilation error: Unhandled error';
    }

    passed = false;
    filter = undefined;
  }

  // Execute expression
  if (filter) {
    // This doesn't throw but returns any potential exceptions
    const result = filter(responses);

    if (result === true || result === false) {
      passed = result;
    } else {
      passed = false;
      error = 'Execution error: ' + (result?.toString() ?? 'Unknown error');
    }
  }

  return {
    passed,
    error,
    fields,
    references,
    invalidFields
  };
}

export function useCondition(condition?: Condition): UseConditionReturn {
  const { form, watch, getValues } = useRippleContext();

  if (!condition) {
    return {
      passed: true,
      fields: [],
      references: {},
      invalidFields: []
    };
  }

  // TODO: Just use watched?
  const responses = getValues();

  const ret = evaluateCondition(form, condition, getValues());

  // watch() is used to trigger a re-render when any referenced fields change.
  // TODO: Do I actually need this anymore?
  const watched = watch(ret.fields);

  return ret;
}
