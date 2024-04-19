import { create } from "zustand";

type SchemaData = {
  sqlSchema: string;
  cmdCode: string;
};

type SchemaState = {
  schema: SchemaData | undefined;
  setSchema: (schema: SchemaData) => void;
};

export const useSchemaStore = create<SchemaState>()((set) => ({
  schema: undefined,
  setSchema: (schema) => set({ schema }),
}));
