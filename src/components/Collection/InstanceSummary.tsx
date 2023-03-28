import {
  Button,
  Chip,
  ConfirmButton,
  Details,
  Group,
  Item,
  Paper,
  Stack,
  Text
} from '@osuresearch/ui';
import React from 'react';
import { useRippleContext } from '../../hooks';
import { Field } from '../Field';
import { context } from '../Page';

export type InstanceSummaryProps = {
  name: FieldName;
  id: string;
  index: number;
  onRemove: (index: number) => void;
  template: PageDefinition;
  summaryTemplate?: Markdown;
};

export function InstanceSummary({ name, id, index, template, summaryTemplate, onRemove }: InstanceSummaryProps) {
  const PageProvider = context.Provider;

  const { watch } = useRippleContext();

  // First field in the template is our title field.
  // TODO: ... for now. This may be more configurable later.
  // Maybe each page's title can actually inject field names?
  const firstField = Object.keys(template.fields)[0];
  const title = watch(`${name}.${index}.${firstField}`);

  // TODO: Render summary template
  const summary = summaryTemplate;

  // Content is in the context of the collection template, not the parent page.
  return (
    <PageProvider value={{ name, page: template }}>
      <Details
        mt="-xxs"
        summary={
          <>
            {summary
              ? summary
              : <Text style={{ paddingRight: 100 }}>{title ?? 'Untitled'}</Text>
            }

            <ConfirmButton
              variant="subtle"
              c="error"
              title="Foo bar"
              dialogContentSlot="Delete blah blah"
              primaryActionSlot="Remove"
              onPrimaryAction={() => onRemove(index)}
              style={{
                position: 'absolute',
                top: 'var(--rui-spacing-sm)',
                right: 'var(--rui-spacing-sm)'
              }}
            >
              Remove
            </ConfirmButton>
          </>
        }
      >
        <Chip variant="outline" c="pink">ID: {id}</Chip>

        {Object.keys(template.fields).map((fieldName) => (
          <Field key={fieldName} name={fieldName} instance={`${name}.${index}`} />
        ))}
      </Details>
    </PageProvider>
  );
}
