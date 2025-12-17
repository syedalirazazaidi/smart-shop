import { type SchemaTypeDefinition } from 'sanity'
import { tenantType } from './tenant'
import { productType } from './product'
import { categoryType } from './category'

export const schemaTypes = [
  tenantType,
  productType,
  categoryType,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
