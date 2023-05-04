import { v4 as uuidv4 } from 'uuid';
import { usePageContext } from './usePageContext';
import { useRippleContext } from './useRippleContext';
import { CollectionInstanceId, PageResponses, BaseField, CollectionField, FieldName } from '../types';

export type UseCollectionReturn = {
  items: Record<CollectionInstanceId, PageResponses>;
  definition: BaseField & CollectionField;

  add: () => CollectionInstanceId;
  remove: (id: CollectionInstanceId) => void;
}

export function useCollection(name: FieldName): UseCollectionReturn {
  const ctx = useRippleContext();
  const { page } = usePageContext();

  const parts = name.split('.');
  const localFieldName = parts[parts.length - 1];

  const definition = page.fields[localFieldName];
  if (!definition) {
    throw new Error(
      `Could not retrieve definition for collection '${localFieldName}.' Full named path was '${name}'`
    );
  }

  if (!definition.template) {
    throw new Error(`Missing template for collection field '${name}`);
  }

  const template = definition.template;
  const items = (ctx.watch(name) ?? {}) as Record<CollectionInstanceId, PageResponses>;

  const add = () => {
    const id = uuidv4();
    ctx.setValue(`${name}.${id}`, {
        ...Object.keys(template.fields).reduce(
          (agg, name) => ((agg[name] = null), agg),
          {} as Record<string, any>
        )
    });
    return id;
  }

  const remove = (id: CollectionInstanceId) => {
    ctx.setValue(`${name}.${id}._deleted`, true);
  }

  return {
    items,
    definition,
    add,
    remove
  }
}
