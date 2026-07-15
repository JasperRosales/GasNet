import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import { createBranch, deleteBranch } from '../../src/services/tables/branchesService.js'
import { createStaff, deleteStaff } from '../../src/services/tables/staffService.js'
import {
  createSalesTransaction,
  getSalesTransactionById,
  updateSalesTransaction,
  deleteSalesTransaction
} from '../../src/services/tables/salesTransactionsService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

const client = hasSupabaseEnv ? getSupabaseClient() : null

if (!hasSupabaseEnv) {
  describe('Create/Read/Update/Delete (sales_transactions)', () => {
    it('skips CRUD tests when env vars are not set', () => {})
  })
}

describe('Supabase CRUD integration (sales_transactions)', () => {
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
    it('create -> broken payload (validation)', async () => {
      await expect(
        createSalesTransaction(client, {
          // missing sales_id
          idempotency_key: 'idem'
        })
      ).rejects.toThrow(/Missing required field: sales_id/i)

      await expect(
        createSalesTransaction(client, {
          sales_id: 'nope',
          idempotency_key: 'idem'
        })
      ).rejects.toThrow(/Invalid type for sales_id/i)

      await expect(
        createSalesTransaction(client, {
          sales_id: 0,
          idempotency_key: 'idem'
        })
      ).rejects.toThrow(/out of range/i)

      await expect(
        createSalesTransaction(client, {
          sales_id: 123,
          idempotency_key: ''
        })
      ).rejects.toThrow(/too short/i)
    })

    it('create -> store payload for Read/Update/Delete', async () => {
      const branchId = 999006
      const staffId = '00000000-0000-4000-8000-000000000003'

      await createBranch(client, { branch_id: branchId, branch_name: 'Crud SalesTx Branch' })
      await createStaff(client, { staff_id: staffId, username: 'crud_sales_staff_1' })

      const salesId = 999006
      const payload = {
        sales_id: salesId,
        idempotency_key: 'crud_sales_tx_idem_1'
      }

      const created = await createSalesTransaction(client, payload)
      expect(created.sales_id).toBe(salesId)
      expect(created.idempotency_key).toBe(payload.idempotency_key)

      ids = { branchId, staffId, salesId }
    })
  })

  describe('Read', () => {
    it('read -> fetch created entity', async () => {
      const fetched = await getSalesTransactionById(client, ids.salesId)
      expect(fetched).toBeTruthy()
      expect(fetched.idempotency_key).toBe('crud_sales_tx_idem_1')
    })

    it('read -> broken id (validation)', async () => {
      await expect(getSalesTransactionById(client, 0)).rejects.toThrow(/Invalid value for sales_id/i)
      await expect(getSalesTransactionById(client, 'x')).rejects.toThrow(/Invalid type for sales_id/i)
    })
  })

  describe('Update', () => {
    it('update -> apply changes', async () => {
      const updated = await updateSalesTransaction(client, ids.salesId, {
        idempotency_key: 'crud_sales_tx_idem_1_updated'
      })
      expect(updated.idempotency_key).toBe('crud_sales_tx_idem_1_updated')
    })

    it('update -> broken payload (validation)', async () => {
      await expect(updateSalesTransaction(client, 0, { idempotency_key: 'x' })).rejects.toThrow(
        /Invalid value for sales_id/i
      )

      await expect(updateSalesTransaction(client, 1, {})).rejects.toThrow(/Missing required field: idempotency_key/i)

      await expect(updateSalesTransaction(client, 1, { idempotency_key: 123 })).rejects.toThrow(
        /Invalid type for idempotency_key/i
      )

      await expect(updateSalesTransaction(client, 1, { idempotency_key: ' ' })).rejects.toThrow(/too short/i)
    })
  })

  describe('Delete', () => {
    it('delete -> remove entity + verify non-existent', async () => {
      await deleteSalesTransaction(client, ids.salesId)

      await expect(getSalesTransactionById(client, ids.salesId)).resolves.toBeNull()
      await expect(deleteSalesTransaction(client, ids.salesId)).rejects.toThrow(/not found/i)

      await deleteStaff(client, ids.staffId)
      await deleteBranch(client, ids.branchId)
    })

    it('delete -> broken id (validation)', async () => {
      await expect(deleteSalesTransaction(client, 0)).rejects.toThrow(/Invalid value for sales_id/i)
      await expect(deleteSalesTransaction(client, 'x')).rejects.toThrow(/Invalid type for sales_id/i)
    })

    it('delete -> non-existent entity', async () => {
      await expect(deleteSalesTransaction(client, 989997)).rejects.toThrow(/not found/i)
    })
  })
})

