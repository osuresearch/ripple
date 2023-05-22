import { compileExpression, Options, useDotAccessOperator } from 'filtrex';

export function getReferencedFields(condition: string): string[] {
  // See: https://github.com/m93a/filtrex/issues/56
  function getUsedVariables(expression: string, data: any) {
    const usedVars: string[] = [];

    const options: Options = {
      // operators: {
      //   '==': (a, b) => false,
      //   '!=': (a, b) => false,
      // },
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
        usedVars.push(propertyName);
        return false;
      }
    };
    compileExpression(expression, options)(data);
    return usedVars;
  }

  // TODO: This grammar filtering hack to disable short circuiting the condition
  // is flimsy at best. I'd rather have something native to filtrex that
  // can better handle extracting variables.
  const result = getUsedVariables(
    condition.replaceAll(' and ', ' or ').replaceAll(' not ', ' '),
    {}
  );

  return result;
}
