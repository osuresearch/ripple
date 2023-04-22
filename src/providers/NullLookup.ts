import { RippleLookupProvider } from "../types";


export const NullLookup: RippleLookupProvider = {
  keys: async () => {
    throw new Error("Function not implemented.");
  },
  autocomplete: async (key: string, terms: string) => {
    throw new Error("Function not implemented.");
  },
  get: async (key: string, id: string[]) => {
    throw new Error("Function not implemented.");
  },
  all: async (key: string) => {
    throw new Error("Function not implemented.");
  }
}
