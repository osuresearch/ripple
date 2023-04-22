
import { Details, ConfirmButton, Text } from '@osuresearch/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { fieldToPath, normalizeFieldPath } from '../../tools';
import { PageContext } from '../../hooks/usePageContext';
import { Field } from '../Field';
import { Markdown } from '../Markdown';
import { CollectionInstanceId, PageDefinition, FieldName } from '../../types';

export type InlineInstanceProps = {
  id: CollectionInstanceId
  name: FieldName
  page: PageDefinition
}

export function InlineInstance({ id, name, page }: InlineInstanceProps) {
  const PageProvider = PageContext.Provider;

  return (
    <PageProvider value={{ name, page }}>
      {Object.keys(page.fields).map((fieldName) => (
        <Field key={fieldName} name={`${name}.${id}.${fieldName}`} />
      ))}
    </PageProvider>
  )
}
