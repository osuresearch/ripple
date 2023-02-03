import { useEffect, useMemo, useRef, useState } from 'react';

type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

/**
 * Subscribe to element size and position changes with `ResizeObserver`
 *
 * Usage:
 * ```tsx
 * const [ref, rect] = useResizeObserver();
 *
 * <>
 *   <textarea ref={ref} style={{ width: 400, height: 120 }} />
 *   <Text>Rect: <Code>{JSON.stringify(rect)}</Code></Text>
 * </>
 * ```
 *
 * @author mantine.dev
 */
export function useResizeObserver<T extends HTMLElement = any>() {
  const frameID = useRef(0);
  const ref = useRef<T>(null);

  const [rect, setRect] = useState<ObserverRect>(defaultState);

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries: any) => {
            const entry = entries[0];

            if (entry) {
              cancelAnimationFrame(frameID.current);

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  setRect(entry.contentRect);
                }
              });
            }
          })
        : null,
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [ref.current]);

  return [ref, rect] as const;
}

export function useElementSize<T extends HTMLElement = any>() {
  const [ref, { width, height }] = useResizeObserver<T>();
  return { ref, width, height };
}
