import React from 'react';

export type AnnotationPopoverProps = {
  coords: Rect;
  onAddComment: () => void;
};

export function AnnotationPopover({ coords, onAddComment }: AnnotationPopoverProps) {
  return (
    <button
      style={{
        position: 'absolute',
        top: coords.y - 24,
        left: coords.x
      }}
      onClick={onAddComment}
    >
      💬 Comment
    </button>
  );
}
