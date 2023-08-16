import React from 'react';
import striptags from 'striptags';

import {
  CollectionInstanceId,
  BaseField,
  CollectionField,
  PageResponses,
  PageDefinition,
  MarkdownText
} from '../../types';
import { Markdown } from '../Markdown';

export type InstanceSummaryProps = {
  id: CollectionInstanceId;
  definition: BaseField & CollectionField;
  responses: PageResponses;
};

function createDefaultSummary(page: PageDefinition, responses: PageResponses): MarkdownText {
  return Object.keys(page.fields)
    .map((fieldName) => {
      const field = page.fields[fieldName];
      const response = responses[fieldName];

      if (!response) {
        return `- ${field.label}: *(no response)*`;
      }

      if (typeof response === 'string' || typeof response === 'number') {
        return `- ${field.label}: ${response}`;
      }

      // Note that this doesn't work with complex fields yet.
      return `- ${field.label}: (Cannot render type ${typeof response} yet)`;
    })
    .join('\n');
}

/**
 * Render the summary template for a collection instance
 */
export function InstanceSummary({ id, definition, responses }: InstanceSummaryProps) {
  // Summary is either a markdown string OR a function that
  // accepts the current responses and returns an interpolated
  // markdown string.
  let summary =
    typeof definition.summary === 'function' ? definition.summary(responses) : definition.summary;

  // Fallback to just rendering a list of responses if the
  // markdown was never supplied for a custom layout.
  if (!summary) {
    summary = createDefaultSummary(definition.template, responses);
  }

  // Embedded responses may contain HTML. We allow a subset of that
  // HTML that can be considered "safe". Although, ideally we should
  // just convert it to markdown and let the parser re-convert it
  // to meet all a11y and style requirements.
  summary = striptags(summary, ['strong', 'em', 'a']);

  return <Markdown text={summary} />;
}
