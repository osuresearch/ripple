import { createContext, useContext } from "react";
import { PageDefinition, PageName } from "../types";

export type IPageContext = {
  name: PageName;
  page: PageDefinition;
};

export const PageContext = createContext<IPageContext>({} as IPageContext);

export function usePageContext(): IPageContext {
  const ctx = useContext(PageContext);

  if (!ctx) {
    throw new Error(
      'Cannot call usePageContext outside of a Ripple Page context',
    );
  }

  return ctx;
}
