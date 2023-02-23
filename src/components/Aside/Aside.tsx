import React from 'react';
import { useRippleContext } from '../../hooks';
import { Comments } from '../Comments';

export function Aside() {
  const { selector } = useRippleContext();
  const showComments = selector((state) => state.settings.showComments);

  if (!showComments) {
    return null;
  }

  return <Comments />;
}
