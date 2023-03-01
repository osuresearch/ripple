import React from 'react';
import { useRippleContext } from '../../hooks';
import { Annotations } from '../Annotations';

export function Aside() {
  const { selector } = useRippleContext();
  const showComments = selector((state) => state.settings.showComments);

  if (!showComments) {
    return null;
  }

  return <Annotations />;
}
