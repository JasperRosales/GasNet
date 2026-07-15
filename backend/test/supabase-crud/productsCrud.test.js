import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../../src/services/tables/productsService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

describe('Supabase CRUD integration (products)', () => {
  const client = hasSupabaseEnv ? getSupabaseClient() : null

  it('skips when SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY are not provided', async () => {
    if (hasSupabaseEnv) {
      expect(client).toBeTruthy()
      return
    }
    expect(client).toBeNull()
  })

  if (!hasSupabaseEnv) return

  it('products: create -> read -> update -> delete -> delete non-existent', async () => {
    const productPayload = {
      product_id: 999002,
      product_name: 'Crud Product (Ob3W4D2)'
    }

    const created = await createProduct(client, productPayload)
    expect(created.product_id).toBe(productPayload.product_id)

    const fetched = await getProductById(client, productPayload.product_id)
    expect(fetched).toBeTruthy()
    expect(fetched.product_name).toBe(productPayload.product_name)

    const updated = await updateProduct(client, productPayload.product_id, {
      product_name: 'Crud Product Updated (Ob3W4D2)'
    })
    expect(updated.product_name).toBe('Crud Product Updated (Ob3W4D2)')

    await deleteProduct(client, productPayload.product_id)

    await expect(getProductById(client, productPayload.product_id)).resolves.toBeNull()
    await expect(deleteProduct(client, productPayload.product_id)).rejects.toThrow(/not found/i)
  })

  it('products: create -> broken payload (validation)', async () => {
    await expect(
      createProduct(client, {
        // missing product_id
        product_name: 'Invalid product'
      })
    ).rejects.toThrow(/Missing required field: product_id/i)

    await expect(
      createProduct(client, {
        product_id: 'nope',
        product_name: 'Invalid product'
      })
    ).rejects.toThrow(/Invalid type for product_id/i)

    await expect(
      createProduct(client, {
        product_id: -5,
        product_name: 'Invalid product'
      })
    ).rejects.toThrow(/out of range/i)

    await expect(
      createProduct(client, {
        product_id: 1,
        product_name: ''
      })
    ).rejects.toThrow(/too short/i)
  })

  it('products: read -> broken id (validation)', async () => {
    await expect(getProductById(client, 0)).rejects.toThrow(/Invalid value for product_id/i)
    await expect(getProductById(client, 'x')).rejects.toThrow(/Invalid type for product_id/i)
  })

  it('products: update -> broken payload (validation)', async () => {
    await expect(updateProduct(client, 0, { product_name: 'x' })).rejects.toThrow(
      /Invalid value for product_id/i
    )

    await expect(updateProduct(client, 1, {})).rejects.toThrow(/Missing required field: product_name/i)

    await expect(updateProduct(client, 1, { product_name: 123 })).rejects.toThrow(
      /Invalid type for product_name/i
    )

    await expect(updateProduct(client, 1, { product_name: ' ' })).rejects.toThrow(/too short/i)
  })

  it('products: delete -> broken id (validation)', async () => {
    await expect(deleteProduct(client, 0)).rejects.toThrow(/Invalid value for product_id/i)
    await expect(deleteProduct(client, 'x')).rejects.toThrow(/Invalid type for product_id/i)
  })

  it('products: delete -> non-existent entity', async () => {
    const nonExistentId = 989998
    await expect(deleteProduct(client, nonExistentId)).rejects.toThrow(/not found/i)
  })
})

