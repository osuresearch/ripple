import { FieldResponse, FormResponses, RipplePersistenceProvider } from "../types";


export const LocalStoragePersistence: RipplePersistenceProvider = {
  save: function (responses: FormResponses): Promise<void> {
    throw new Error("Function not implemented.");
  },
  getResponses: function (fields: string[]): Promise<FieldResponse[]> {
    throw new Error("Function not implemented.");
  }
}
