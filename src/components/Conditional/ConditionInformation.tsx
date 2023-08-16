import React from 'react';
import regexifyString from 'regexify-string';

import { Condition, FieldReferenceSet, FieldDefinition, PageDefinition } from '../../types';
import { Box, Stack, Typography } from '@mui/material';

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
      <Typography color="error.main" fontWeight="bold">
        {name}
        {/* <Callout
          contentSlot={
            <Text p="sm" fs="sm">
              Field is missing from the form definition
            </Text>
          }
        >
          <IconButton label="More information" name="exclamationCircle" c="error" size={14} />
        </Callout> */}
      </Typography>
    );
  }

  return (
    <Typography color="warning.main" fontWeight="bold">
      {name}
      {/* <Callout
        contentSlot={
          <Stack p="sm">
            <Text fs="sm">{field?.label}</Text>
            <Group>
              <Chip c="error">required</Chip>
              <Chip variant="indicator" c="green">
                page: {page?.title ?? 'Unknown'}
              </Chip>
            </Group>
          </Stack>
        }
      >
        <IconButton c="warning-contrast" label="More information" name="questionCircle" size={14} />
      </Callout> */}
    </Typography>
  );
}

// const Container = styled.div`
//   border: 2px dashed var(--rui-warning);
//   position: relative;

//   // Being able to fade it out would be nice. But there's
//   // a lot of quirks.

//   /* &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;

//     opacity: 0.1;

//     background: repeating-linear-gradient(
//       -45deg,
//       rgba(0,0,0,0),
//       rgba(0,0,0,0) 10px,
//       var(--rui-warning) 10px,
//       var(--rui-warning) 20px
//     );
//   } */
// `;

export function ConditionInformation({
  name,
  condition = '',
  references,
  passed,
  children
}: ConditionInformationProps) {
  let formatted: string | React.ReactNode = condition;

  const fieldNames = Object.keys(references);
  if (fieldNames.length > 0) {
    const pattern = new RegExp(`(?<field>(${fieldNames.join('|').replaceAll('.', '\\.')}))`, 'g');

    // Replace identified fields with DOM with additional information
    formatted = regexifyString({
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
  }

  return (
    <Box>
      <Stack>
        {/* <Typography as="div" bgc="warning-shade" c="warning-contrast" p="xs" fs="sm">
          <Text fw="bold" c="warning-contrast">
            Condition:{' '}
          </Text>{' '}
          {formatted}
        </Text>
        <Chip m="sm" c={passed ? 'success' : 'error'}>
          {passed ? 'Visible' : 'Hidden'}
        </Chip> */}
      </Stack>
      {children}
    </Box>
  );
}
