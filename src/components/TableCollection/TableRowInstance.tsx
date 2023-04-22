import React from 'react';
import { Details, ConfirmButton, Text } from '@osuresearch/ui';
import { Link } from 'react-router-dom';
import { fieldToPath, normalizeFieldPath } from '../../tools';
import { PageContext } from '../../hooks/usePageContext';
import { Field } from '../Field';
import { Markdown } from '../Markdown';
import { CollectionInstanceId, FieldName, PageDefinition } from '../../types';

export type TableRowInstanceProps = {
  id: CollectionInstanceId
  name: FieldName
  page: PageDefinition
}

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
  )
}
