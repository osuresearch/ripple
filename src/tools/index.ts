export * from './conditions';

export function findField(
  form: FormDefinition,
  name: string
): [FieldDefinition, PageDefinition] | [undefined, undefined] {
  // TODO: Support dot notation and this. notation
  for (const page in form.pages) {
    if (Object.hasOwn(form.pages[page].fields, name)) {
      return [form.pages[page].fields[name], form.pages[page]];
    }
  }

  return [undefined, undefined];
}
