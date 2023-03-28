import React from 'react';
import { useRippleContext } from '../../hooks';

export function Aside() {
  const { selector } = useRippleContext();
  const showComments = selector((state) => state.settings.showComments);

  if (!showComments) {
    return null;
  }

  return (
    <div>
      Annotator components have been moved to @osuresearch/annotator
      and will need to be re-added.
    </div>
  )
}
