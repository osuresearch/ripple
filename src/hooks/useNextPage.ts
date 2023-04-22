import { PageName } from "../types";
import { useRippleContext } from "./useRippleContext";

/**
 * Utility hook to identify the next page to the given current page.
 *
 * This hook will account for response changes and conditions to
 * return the correct next page given the current state of the form.
 *
 * @param current
 */
export function useNextPage(current: PageName) {
  const { form } = useRippleContext();

  const keys = Object.keys(form.pages);
  const idx = keys.indexOf(current);
  if (idx < 0 || idx >= keys.length - 1) {
    return undefined; // No next page.
  }

  const name = keys[idx + 1];
  const definition = form.pages[keys[idx + 1]];

  // Walk forward through pages until we determine which is conditionally visible.

  // TODO:
  // Can't do this though because useCondition() is for *one* condition to be eval'd.
  // Not the full list of pages ahead of the current one. I'd need to refactor
  // useCondition to just async functions and iterate until one passes.

  // For now, we're just returning the next regardless of visibility status.

  return { name, definition };


  // const definition = form.pages[name];

  // const showConditions = selector((state) => state.settings.showConditions);

  // const { passed, error, fields, references } = useCondition(definition.condition);
}
