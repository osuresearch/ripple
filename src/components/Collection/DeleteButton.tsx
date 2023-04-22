import React from 'react';
import { ConfirmButton } from '@osuresearch/ui';
import { CollectionInstanceId, BaseField, CollectionField } from '../../types';

export type DeleteButtonProps = {
  id: CollectionInstanceId
  definition: BaseField & CollectionField
  onRemove: (id: string) => void
}

export function DeleteButton({ id, definition, onRemove }: DeleteButtonProps) {
  return (
    <ConfirmButton
      variant="subtle"
      c="error"
      title="Foo bar"
      dialogContentSlot="Delete blah blah"
      primaryActionSlot="Remove"
      onPrimaryAction={() => onRemove(id)}
    >
      Remove
    </ConfirmButton>
  )
}
