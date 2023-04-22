import { createContext, useContext } from "react";
import { PageDefinition, PageName } from "../types";

export type IPageContext = {
  name: PageName;
  page: PageDefinition;
};

export const PageContext = createContext<IPageContext>({} as IPageContext);

export function usePageContext(): IPageContext {
  return useContext(PageContext);
}
