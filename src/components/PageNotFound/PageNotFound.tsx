import { Heading, Text } from '@osuresearch/ui';
import React from 'react';

/**
 * 404 content for when the user tries to access a missing page / subpage.
 *
 * @returns
 */
export function PageNotFound() {

  // TODO: Helpful content.
  // Maybe direct them to the first page with errors
  // or first page that hasn't been touched.
  // Or just the beginning of the form.
  // Or a similar pages fuzzy search against the url?
  return (
    <div>
      <Heading level={2}>Page not found</Heading>
      <Text>
        Whoops
      </Text>
    </div>
  )
}
