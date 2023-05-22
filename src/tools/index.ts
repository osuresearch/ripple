import { Location } from 'react-router-dom';
import { FormDefinition, FieldDefinition, PageDefinition, PageName, FieldName } from '../types';

export * from './conditions';
export * from './validators';

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

export function getCollectionFields(page: PageDefinition): string[] {
  return Object.keys(page.fields).reduce<string[]>((agg, name) => {
    if (page.fields[name].type === 'Collection') {
      agg.push(name);
    }
    return agg;
  }, []);
}

export function getNextPage(
  form: FormDefinition,
  page: PageName
) {
  // TODO: Condition magic
  const keys = Object.keys(form.pages);

  const idx = keys.indexOf(page);
  if (idx > -1 && idx < keys.length - 1) {
    return {
      name: keys[idx + 1],
      definition: form.pages[keys[idx + 1]]
    };
  }
}

export function getPreviousPage(
  form: FormDefinition,
  page: PageName
) {
  // TODO: Condition magic
  const keys = Object.keys(form.pages);

  const idx = keys.indexOf(page);
  if (idx > -1 && idx > 0) {
    return {
      name: keys[idx - 1],
      definition: form.pages[keys[idx - 1]]
    };
  }
}

export function fieldToPath(jsonPath: FieldName): string {
  const parts = jsonPath.split('.');

  let path = '';
  while (parts.length) {
    const fieldName = parts.shift();
    const instanceId = parts.shift();

    path += '/' + fieldName;

    if (instanceId) {
      path += '.' + instanceId;
    }
  }

  return path;
}

export function normalizeFieldPath(location: Location, jsonPath: FieldName): string {
  const responseRelativePath = fieldToPath(jsonPath).split('/');
  responseRelativePath.shift();

  const locationPath = location.pathname.split('/');

  const overlap = responseRelativePath[0];

  while (locationPath.length && locationPath[locationPath.length - 1] !== overlap) {
    locationPath.pop();
  }

  locationPath.pop();

  return [...locationPath, ...responseRelativePath].join('/');
}
