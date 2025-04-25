import { create } from 'zustand'

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
  setSchema: (schema: SchemaData) => void
  supabaseLinkTables: string | undefined
  setSupabaseLinkTables: (supabaseLinkTables: string | undefined) => void
}

export const useSchemaStore = create<SchemaState>()((set) => ({
  schema: undefined,
  setSchema: (schema) => set({ schema }),
  supabaseLinkTables: undefined,
  setSupabaseLinkTables: (supabaseLinkTables) => set({ supabaseLinkTables })
}))
