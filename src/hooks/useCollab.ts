import { useState, useEffect } from 'react';
import { YTextEvent } from 'yjs';

import { useRippleContext } from './useRippleContext';
import { useDebouncedState } from './useDebouncedState';

export function useCollab(key: string) {
  const { doc, watch, setValue } = useRippleContext();

  const [yNode, setYNode] = useState(doc.getText(key));
  const [debouncedValue, setDebouncedValue] = useDebouncedState('', 200);

  const value = watch(key);

  useEffect(() => {
    console.log('hook observer');
    const observer = (e: YTextEvent) => {
      setValue(key, e.target.toString(), {
        shouldValidate: true,
        shouldDirty: true
      });
    };

    yNode.observe(observer);
    return () => yNode.unobserve(observer);
  }, [yNode]);

  // Fire off a Yjs sync whenever our debounced value is updated
  useEffect(() => {
    if (Array.isArray(value)) {
    } else if (typeof value === 'string') {
      // TODO: Be smart about insertions.
      if (yNode.length > 0) yNode.delete(0, yNode.length);

      yNode.insert(0, value);
      console.debug(yNode);
    } else if (typeof value === 'number') {
      // ????
    } else {
      // ???
    }
  }, [debouncedValue]);

  return [setDebouncedValue];
}
