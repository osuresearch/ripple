
import React from 'react';
import { PageContext } from '../../hooks/usePageContext';
import { Field } from '../Field';
import { CollectionInstanceId, FieldName, PageDefinition } from '../../types';

export type InlineInstancePageProps = {
  id: CollectionInstanceId
  name: FieldName
  page: PageDefinition
}

export function InlineInstancePage({ id, name, page }: InlineInstancePageProps) {
  const PageProvider = PageContext.Provider;

  return (
    <PageProvider value={{ name, page }}>
      {Object.keys(page.fields).map((fieldName) => (
        <Field key={fieldName} name={`${name}.${id}.${fieldName}`} />
      ))}
    </PageProvider>
  )
}
