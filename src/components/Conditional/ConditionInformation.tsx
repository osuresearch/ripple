import { Callout, IconButton, Stack, Group, Chip, Text, HashLink } from '@osuresearch/ui';
import React from 'react';
import regexifyString from 'regexify-string';

export type ConditionInformationProps = {
  name: string;
  condition?: Condition;
  references: FieldReferenceSet;
  passed: boolean;
  children: React.ReactNode;
};

function FieldInfo({
  name,
  field,
  page
}: {
  name: string;
  field?: FieldDefinition;
  page?: PageDefinition;
}) {
  // Bad reference
  if (!field) {
    return (
      <Text c="error" fw="bold">
        {name}
        <Callout contentSlot={<Text p="sm">Field is missing from the form definition</Text>}>
          <IconButton label="More information" name="exclamationCircle" c="error" size={16} />
        </Callout>
      </Text>
    );
  }

  return (
    <Text fw="bold">
      {name}
      <Callout
        contentSlot={
          <Stack p="sm">
            <Text>{field?.label}</Text>
            <Group>
              <Chip c="error">required</Chip>
              <Chip>Page: {page?.title ?? 'Unknown'}</Chip>
            </Group>
          </Stack>
        }
      >
        <IconButton label="More information" name="questionCircle" size={16} />
      </Callout>
    </Text>
  );
}

export function ConditionInformation({
  name,
  condition = '',
  references,
  passed,
  children
}: ConditionInformationProps) {
  const fieldNames = Object.keys(references);

  const pattern = new RegExp(`(?<field>(${fieldNames.join('|').replaceAll('.', '\\.')}))`, 'g');

  // Replace identified fields with DOM with additional information
  const formatted = regexifyString({
    // Compile:
    // ant or not bat and cat in ("dog", "elf") or fish and g.h.i == jaguar
    // /(?<field>(ant|bat|cat|fish|g\.h\.i|jaguar))/g
    pattern,
    decorator: (match, index, result) => {
      const [field, page] = references[match];
      return <FieldInfo name={match} field={field} page={page} />;
    },
    input: condition
  });

  return (
    <div style={{ border: '2px dashed var(--rui-warning)' }}>
      <Group justify="apart">
        <Text as="div" bgc="warning-shade" c="warning-contrast" p="xs">
          <Text fw="bold">Condition: </Text> {formatted}
        </Text>
        <Chip m="sm" c={passed ? 'success' : 'error'}>
          {passed ? 'Visible' : 'Hidden'}
        </Chip>
      </Group>
      {children}
    </div>
  );
}
