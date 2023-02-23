import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFrame } from 'react-frame-component';
import { Reviewable } from './Reviewable';

export type AnchorProps = {
  id: string;
  document: Document;
  el: HTMLElement;
};

export function Anchor({ id, el }: AnchorProps) {
  const [dom, setDOM] = useState<string>();
  const ref = useRef<HTMLDivElement>(null);

  // On mount, we steal the children of the target
  // and render it ourselves as an interactive component
  useEffect(() => {
    setDOM(el.innerHTML);
    el.innerHTML = '';
  }, [el]);

  if (!dom) {
    return null;
  }

  return createPortal(<Reviewable ref={ref} name={id} content={dom} />, el);
}
