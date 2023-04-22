import { PageName } from "../types";
import { useRippleContext } from "./useRippleContext";

/**
 * Utility hook to identify the previous page to the given current page.
 *
 * This hook will account for response changes and conditions to
 * return the correct previous page given the current state of the form.
 *
 * @param current
 */
export function usePreviousPage(current: PageName) {
  const { form } = useRippleContext();

  const keys = Object.keys(form.pages);
  const idx = keys.indexOf(current);
  if (idx < 1) {
    return undefined; // No previous page
  }

  const name = keys[idx - 1];
  const definition = form.pages[keys[idx - 1]];

  // Walk backward through pages until we determine which is conditionally visible.

  // TODO: see notes about useCondition in useNextPage(). Do the same here.

  return { name, definition };
}
