import React from 'react';
import { BaseFieldProps } from '../../react';
import { Typography } from '@mui/material';

export type SectionProps = BaseFieldProps<void>;

/**
 * Field that represents a section heading in a form.
 *
 * Sections, themselves, are not submittable as field data.
 * They exist only for layout purposes.
 *
 * It is recommended that you prefix the field name of a section with
 * an underscore.
 *
 * States (validation, diffing) are ignored for sections.
 */
export function Section({ label, description }: SectionProps) {
  return (
    <>
      <Typography variant="h2">
        {label}
        {/* <HashLink id={'ripple-page-' + name}>{label}</HashLink> */}
      </Typography>

      {description && <p>{description}</p>}
    </>
  );
}
