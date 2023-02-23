import React from 'react';

export type ReviewPopoverProps = {
  coords: Rect;
  onAddComment: () => void;
};

export function ReviewPopover({ coords, onAddComment }: ReviewPopoverProps) {
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
