import React from 'react';
import { BaseFieldProps } from '../../react';
import { Heading, HashLink } from '@osuresearch/ui';

export type SectionProps = BaseFieldProps<void>;

/**
 * Field that represents a section heading in a form.
 *
 * Sections, themselves, are not submittable as field data.
 * They exist only for layout purposes.
 */
export function Section({ label, description }: SectionProps) {
  return (
    <>
      <Heading level={2}>
        <HashLink id={'ripple-page-' + name}>{label}</HashLink>
      </Heading>

      {description &&
        <p>{description}</p>
      }
    </>
  );
}

