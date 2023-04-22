import React from 'react';
import { Details, ConfirmButton, Text } from '@osuresearch/ui';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fieldToPath, normalizeFieldPath } from '../../tools';
import { PageContext } from '../../hooks/usePageContext';
import { Field } from '../Field';
import { Markdown } from '../Markdown';
import { PageDefinition } from '../../types';

export type TableHeadersProps = {
  isDisabled?: boolean
  widths?: string[]
  page: PageDefinition
}

const TH = styled.th`
  text-align: left;
`

export function TableHeaders({ widths, page, isDisabled }: TableHeadersProps) {
  return (
    <thead>
      <tr>
        {Object.values(page.fields).map((field, i) =>
          <TH key={i} style={{
            width: (widths && widths.length > i) ? widths[i] : undefined
          }}>
            {field.label}
          </TH>
        )}

        {!isDisabled &&
          <TH style={{ width: '1%' }} />
        }
      </tr>
    </thead>
  )
}
