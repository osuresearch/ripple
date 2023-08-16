import React from 'react';
import { PageDefinition } from '../../types';

export type TableHeadersProps = {
  isDisabled?: boolean;
  widths?: string[];
  page: PageDefinition;
};

export function TableHeaders({ widths, page, isDisabled }: TableHeadersProps) {
  return (
    <thead>
      <tr>
        {Object.values(page.fields).map((field, i) => (
          <th
            key={i}
            style={{
              width: widths && widths.length > i ? widths[i] : undefined
            }}
          >
            {field.label}
          </th>
        ))}

        {!isDisabled && <th style={{ width: '1%' }} />}
      </tr>
    </thead>
  );
}
