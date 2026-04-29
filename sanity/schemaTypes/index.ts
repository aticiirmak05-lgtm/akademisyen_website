import { type SchemaTypeDefinition } from 'sanity'
import { category } from './category'
import { artwork } from './artwork'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, artwork],
}
