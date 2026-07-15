import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import { createBranch, deleteBranch } from '../../src/services/tables/branchesService.js'
import { createProduct, deleteProduct } from '../../src/services/tables/productsService.js'

import {
  createBranchStock,
  getBranchStockById,
  updateBranchStock,
  deleteBranchStock
} from '../../src/services/tables/branchStockService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

const client = hasSupabaseEnv ? getSupabaseClient() : null

if (!hasSupabaseEnv) {
  describe('Create/Read/Update/Delete (branch_stock)', () => {
    it('skips CRUD tests when env vars are not set', () => {})
  })
}

describe('Supabase CRUD integration (branch_stock)', () => {
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
    it('branch_stock: create -> broken payload (validation)', async () => {
      await expect(
        createBranchStock(client, {
          // missing stock_id
          branch_id: 1,
          product_id: 1,
          quantity: 10,
          reorder_level: 3
        })
      ).rejects.toThrow(/Missing required field: stock_id/i)

      await expect(
        createBranchStock(client, {
          stock_id: 1,
          branch_id: 'nope',
          product_id: 1,
          quantity: 10,
          reorder_level: 3
        })
      ).rejects.toThrow(/Invalid type for branch_id/i)

      await expect(
        createBranchStock(client, {
          stock_id: 1,
          branch_id: 1,
          product_id: 1,
          quantity: -1,
          reorder_level: 3
        })
      ).rejects.toThrow(/out of range|Invalid value for quantity/i)

      await expect(
        createBranchStock(client, {
          stock_id: 1,
          branch_id: 1,
          product_id: 1,
          quantity: 10,
          reorder_level: -1
        })
      ).rejects.toThrow(/out of range|Invalid value for reorder_level/i)
    })

    it('branch_stock: create -> store payload for Read/Update/Delete', async () => {
      const branchId = 999005
      const productId = 999005
      const stockId = 999005

      await createBranch(client, { branch_id: branchId, branch_name: 'Crud Stock Branch' })
      await createProduct(client, { product_id: productId, product_name: 'Crud Stock Product' })

      ids = { branchId, productId, stockId }

      const payload = {
        stock_id: stockId,
        branch_id: branchId,
        product_id: productId,
        quantity: 10,
        reorder_level: 3
      }

      const created = await createBranchStock(client, payload)
      expect(created.stock_id).toBe(stockId)
      expect(created.quantity).toBe(10)
      expect(created.reorder_level).toBe(3)
    })

    it('branch_stock: broken relations (FK/constraint)', async () => {
      const missingBranchId = 988003
      const missingProductId = 988004
      const missingStockId = 988005

      await expect(
        createBranchStock(client, {
          stock_id: missingStockId,
          branch_id: missingBranchId,
          product_id: missingProductId,
          quantity: 1,
          reorder_level: 0
        })
      ).rejects.toThrow(/constraint|violat|failed/i)
    })
  })

  describe('Read', () => {
    it('branch_stock: read -> broken ids (validation)', async () => {
      await expect(getBranchStockById(client, 0)).rejects.toThrow(/Invalid value for stock_id/i)
      await expect(getBranchStockById(client, 'x')).rejects.toThrow(/Invalid type for stock_id/i)
    })

    it('branch_stock: read -> fetch created entity', async () => {
      const fetched = await getBranchStockById(client, ids.stockId)
      expect(fetched).toBeTruthy()
      expect(fetched.quantity).toBe(10)
    })
  })

  describe('Update', () => {
    it('branch_stock: update -> apply changes', async () => {
      const updated = await updateBranchStock(client, ids.stockId, { quantity: 25, reorder_level: 7 })
      expect(updated.quantity).toBe(25)
      expect(updated.reorder_level).toBe(7)
    })

    it('branch_stock: update -> broken payload (validation)', async () => {
      await expect(updateBranchStock(client, 1, {})).rejects.toThrow(
        /Invalid type for quantity|Invalid value for quantity/i
      )

      await expect(updateBranchStock(client, 1, { quantity: -1, reorder_level: 0 })).rejects.toThrow(
        /out of range|Invalid value for quantity/i
      )

      await expect(updateBranchStock(client, 1, { quantity: 0, reorder_level: -1 })).rejects.toThrow(
        /out of range|Invalid value for reorder_level/i
      )

      await expect(updateBranchStock(client, 1, { quantity: 1, reorder_level: 'nope' })).rejects.toThrow(
        /Invalid type for reorder_level/i
      )
    })
  })

  describe('Delete', () => {
    it('branch_stock: delete -> remove entity + verify non-existent', async () => {
      await deleteBranchStock(client, ids.stockId)

      await expect(getBranchStockById(client, ids.stockId)).resolves.toBeNull()
      await expect(deleteBranchStock(client, ids.stockId)).rejects.toThrow(/not found/i)

      await deleteProduct(client, ids.productId)
      await deleteBranch(client, ids.branchId)
    })

    it('branch_stock: delete -> broken ids (validation)', async () => {
      await expect(deleteBranchStock(client, 'x')).rejects.toThrow(/Invalid type for stock_id/i)
    })
  })
})

