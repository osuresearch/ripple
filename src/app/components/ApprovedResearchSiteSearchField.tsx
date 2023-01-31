import { Item, LookupField, LookupFieldProps } from '@osuresearch/ui';
import React from 'react';
import { useAsyncList } from 'react-stately';

export type ApprovedResearchSiteSearchFieldProps = Omit<LookupFieldProps, 'children'> & {
  endpoint?: string;
};

export function ApprovedResearchSiteSearchField(props: ApprovedResearchSiteSearchFieldProps) {
  const { endpoint, ...lookupProps } = props;

  // TODO: Do magic thing with endpoint.

  const list = useAsyncList<any>({
    async load({ signal, cursor }) {
      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || 'https://pokeapi.co/api/v2/pokemon', {
        signal
      });

      const json = await res.json();
      return {
        items: json.results,
        cursor: json.next
      };
    }
  });

  return (
    <LookupField {...lookupProps} items={list.items}>
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </LookupField>
  );
}
