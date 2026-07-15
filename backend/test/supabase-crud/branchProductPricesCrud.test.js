import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import { createBranch, deleteBranch } from '../../src/services/tables/branchesService.js'
import { createProduct, deleteProduct } from '../../src/services/tables/productsService.js'

import {
  createBranchProductPrice,
  getBranchProductPrice,
  updateBranchProductPrice,
  deleteBranchProductPrice
} from '../../src/services/tables/branchProductPricesService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

const client = hasSupabaseEnv ? getSupabaseClient() : null

if (!hasSupabaseEnv) {
  describe('Create/Read/Update/Delete (branch_product_prices)', () => {
    it('skips CRUD tests when env vars are not set', () => {})
  })
}

describe('Supabase CRUD integration (branch_product_prices)', () => {
  it('skips when SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY are not provided', async () => {
    if (hasSupabaseEnv) {
      expect(client).toBeTruthy()
      return
    }
    expect(client).toBeNull()
  })

  if (!hasSupabaseEnv) return

  let ids = null

  describe('Create', () => {
    it('branch_product_prices: create -> broken payload (validation)', async () => {
      await expect(
        createBranchProductPrice(client, {
          // missing branch_id
          product_id: 1,
          price: 10
        })
      ).rejects.toThrow(/Missing required field: branch_id/i)

      await expect(
        createBranchProductPrice(client, {
          branch_id: 'nope',
          product_id: 1,
          price: 10
        })
      ).rejects.toThrow(/Invalid type for branch_id/i)

      await expect(
        createBranchProductPrice(client, {
          branch_id: 1,
          product_id: 1,
          price: -1
        })
      ).rejects.toThrow(/out of range|Invalid value for price/i)

      await expect(
        createBranchProductPrice(client, {
          branch_id: 1,
          product_id: 1,
          price: 10.5
        })
      ).resolves.toBeTruthy()
    })

    it('branch_product_prices: create -> store payload for Read/Update/Delete', async () => {
      const branchId = 999004
      const productId = 999004

      await createBranch(client, { branch_id: branchId, branch_name: 'Crud BP Price Branch' })
      await createProduct(client, { product_id: productId, product_name: 'Crud BP Price Product' })

      ids = { branchId, productId }

      const payload = {
        branch_id: branchId,
        product_id: productId,
        price: 123
      }

      const created = await createBranchProductPrice(client, payload)
      expect(created.branch_id).toBe(branchId)
      expect(created.product_id).toBe(productId)
      expect(created.price).toBe(123)
    })

    it('branch_product_prices: broken relations (FK/constraint)', async () => {
      const missingBranchId = 988001
      const missingProductId = 988002

      await expect(
        createBranchProductPrice(client, {
          branch_id: missingBranchId,
          product_id: missingProductId,
          price: 10
        })
      ).rejects.toThrow(/constraint|violat|failed/i)
    })
  })

  describe('Read', () => {
    it('branch_product_prices: read -> fetch created entity', async () => {
      const fetched = await getBranchProductPrice(client, ids.branchId, ids.productId)
      expect(fetched).toBeTruthy()
      expect(fetched.price).toBe(123)
    })

    it('branch_product_prices: read/update/delete -> broken ids (validation)', async () => {
      await expect(getBranchProductPrice(client, 0, 1)).rejects.toThrow(/Invalid value for branch_id/i)
      await expect(getBranchProductPrice(client, 1, 0)).rejects.toThrow(/Invalid value for product_id/i)
    })
  })

  describe('Update', () => {
    it('branch_product_prices: update -> apply changes', async () => {
      const updated = await updateBranchProductPrice(client, ids.branchId, ids.productId, { price: 456 })
      expect(updated.price).toBe(456)
    })

    it('branch_product_prices: update -> broken payload (validation)', async () => {
      await expect(updateBranchProductPrice(client, 1, 1, {})).rejects.toThrow(/Missing required field: price/i)

      await expect(updateBranchProductPrice(client, 1, 1, { price: -1 })).rejects.toThrow(
        /out of range|Invalid value for price/i
      )

      await expect(updateBranchProductPrice(client, 1, 1, { price: 'nope' })).rejects.toThrow(
        /Invalid type for price/i
      )
    })
  })

  describe('Delete', () => {
    it('branch_product_prices: delete -> remove entity + verify non-existent', async () => {
      await deleteBranchProductPrice(client, ids.branchId, ids.productId)

      await expect(getBranchProductPrice(client, ids.branchId, ids.productId)).resolves.toBeNull()
      await expect(deleteBranchProductPrice(client, ids.branchId, ids.productId)).rejects.toThrow(/not found/i)

      await deleteProduct(client, ids.productId)
      await deleteBranch(client, ids.branchId)
    })

    it('branch_product_prices: read/update/delete -> broken ids (validation)', async () => {
      await expect(getBranchProductPrice(client, 0, 1)).rejects.toThrow(/Invalid value for branch_id/i)
      await expect(getBranchProductPrice(client, 1, 0)).rejects.toThrow(/Invalid value for product_id/i)

      await expect(updateBranchProductPrice(client, 0, 1, { price: 10 })).rejects.toThrow(
        /Invalid value for branch_id/i
      )

      await expect(deleteBranchProductPrice(client, 'x', 1)).rejects.toThrow(/Invalid type for branch_id/i)
    })
  })
})

