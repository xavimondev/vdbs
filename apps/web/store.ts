import { create } from 'zustand'
import { DatabaseFormat } from './types/database'

type Table = {
  name: string
  numberOfColumns: number
}

type SchemaData = {
  sqlSchema: string
  tables: Table[]
}

type SchemaState = {
  schema: SchemaData | undefined
  setSchema: (schema: SchemaData | undefined) => void
  databaseFormat: DatabaseFormat
  setDatabaseFormat: (format: DatabaseFormat) => void
}

export const useSchemaStore = create<SchemaState>()((set) => ({
  schema: undefined,
  setSchema: (schema) => set({ schema }),
  databaseFormat: 'postgresql',
  setDatabaseFormat: (format: DatabaseFormat) => set({ databaseFormat: format })
}))
