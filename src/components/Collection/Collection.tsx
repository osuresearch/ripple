import React, { forwardRef, useContext } from 'react';

import { context } from '../Page';
import { Markdown } from '../Markdown';
import { Conditional } from '../Conditional';
import { useRippleContext } from '../../hooks/useRippleContext';
import { FieldComponentProps } from '../../react';
import { Alert, Button, Group, Heading, Stack, Text } from '@osuresearch/ui';
import { useFieldArray } from 'react-hook-form';
import { InstanceSummary } from './InstanceSummary';

export type CollectionProps = FieldComponentProps<any>;

export function Collection({ name = '__invalid', ...props }: CollectionProps) {
  const { control } = useRippleContext();
  const { name: pageName, page } = useContext(context);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name
  });

  // This is magic that needs to handle instances.

  const template = page.fields[name].template;
  const summaryTemplate = page.fields[name].summary;

  if (!template) {
    return (
      <Alert variant="error" title={`Missing template for '${name}'`}>
        Form definition does not include a PageDefinition template to use for instancing this
        collection.
      </Alert>
    );
  }

  const onRemove = (index: number) => {
    remove(index);
    // TODO: ?
  };

  const onAdd = () => {
    append({
      // Generate a set of unanswered fields from the template
      ...Object.keys(template.fields).reduce(
        (agg, name) => ((agg[name] = null), agg),
        {} as Record<string, any>
      )
    });

    // TODO: take them to the page for editing?
  };

  return (
    <Stack align="stretch">
      {/* Will be a Stack + Markdown */}
      <Group justify="apart" align="center">
        <Heading level={3}>{props.label}</Heading>
        <Button onPress={onAdd}>Add</Button>
      </Group>

      {/* Will be markdown (optional) */}
      {props.description}

      {/* TODO: errorMessage, isRequired, necessityIndicator  */}

      <Stack gap={0} align="stretch">
        {fields.map((field, index) => (
          <InstanceSummary
            name={name}
            template={template}
            summaryTemplate={summaryTemplate}
            key={field.id}
            id={field.id}
            index={index}
            onRemove={onRemove}
          />
        ))}
      </Stack>

      {fields.length < 1 && (
        <Text>{props.placeholder ?? 'There\'s nothing here! Click the Add button to start adding entries'}</Text>
      )}
    </Stack>
  );
}
