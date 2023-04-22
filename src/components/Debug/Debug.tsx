import React from 'react';
import { useRippleContext } from '../../hooks';

/**
 * Render content only when teh debugger is active
 */
export function Debug({ children }: { children: React.ReactNode }) {
  const { selector } = useRippleContext();
  const showDebugger = selector((state) => state.settings.showDebugger);

  if (!showDebugger) {
    return null;
  }

  return <>{children}</>;
}
