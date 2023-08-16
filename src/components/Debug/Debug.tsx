import React from 'react';
import { useRippleSelector } from '../../hooks';

/**
 * Render content only when the debugger is active
 */
export function Debug({ children }: { children: React.ReactNode }) {
  const showDebugger = useRippleSelector((state) => state.settings.showDebugger);

  if (!showDebugger) {
    return null;
  }

  return <>{children}</>;
}
