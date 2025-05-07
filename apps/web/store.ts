import { create } from 'zustand'

type Table = {
  name: string
  numberOfColumns: number
}

type SchemaData = {
  sqlSchema: string
  tables: Table[]
  databaseFormat: string
}

type SchemaState = {
  schema: SchemaData | undefined
  setSchema: (schema: SchemaData) => void
}

export const useSchemaStore = create<SchemaState>()((set) => ({
  schema: undefined,
  setSchema: (schema) => set({ schema })
}))
