import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFrame } from 'react-frame-component';
import { Anchor, AnchorProps } from './Anchor';
import { Reviewable } from './Reviewable';

/**
 * Controller is injected into the iframe DOM for
 * managing thread anchors and global states.
 */
export function Controller() {
  const { document } = useFrame();
  const [anchors, setAnchors] = useState<AnchorProps[]>([]);

  if (!document) {
    return null;
  }

  // Throw portals into all the anchor targets
  useEffect(() => {
    if (!document) {
      return;
    }

    const blocks = document.querySelectorAll<HTMLElement>('[data-comment-block]');

    const blockAnchors: AnchorProps[] = [];
    blocks.forEach((el) => {
      blockAnchors.push({
        id: el.id,
        document,
        el
      });
    });

    setAnchors(blockAnchors);
  }, [document]);

  // TODO: Stress test fo-sho. We'll be instantiating a LOT of tiptap instances
  // at once. Should really only do it while windowing.

  return (
    <div>
      {anchors.map((anchorProps) => (
        <Anchor key={anchorProps.id} {...anchorProps} />
      ))}
    </div>
  );
}
