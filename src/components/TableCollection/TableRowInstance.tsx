import React from 'react';
import { PageContext } from '../../hooks/usePageContext';
import { CollectionInstanceId, FieldName, PageDefinition } from '../../types';
import { Field } from '../Field';

export type TableRowInstanceProps = {
  id: CollectionInstanceId;
  name: FieldName;
  page: PageDefinition;
};

export function TableRowInstance({ id, name, page }: TableRowInstanceProps) {
  const PageProvider = PageContext.Provider;

  return (
    <PageProvider value={{ name, page }}>
      {Object.keys(page.fields).map((fieldName) => (
        <td key={fieldName}>
          <Field name={`${name}.${id}.${fieldName}`} variant="tableCell" />
        </td>
      ))}
    </PageProvider>
  );
}
