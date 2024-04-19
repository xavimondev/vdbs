import { create } from "zustand";

type SchemaState = {
  schema: string;
  setSchema: (schema: string) => void;
};

export const useSchemaStore = create<SchemaState>()((set) => ({
  schema: "",
  setSchema: (schema) => set({ schema }),
}));
