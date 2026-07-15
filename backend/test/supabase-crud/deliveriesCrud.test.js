import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import { createBranch, deleteBranch } from '../../src/services/tables/branchesService.js'
import { createStaff, deleteStaff } from '../../src/services/tables/staffService.js'
import {
  createSalesTransaction,
  deleteSalesTransaction
} from '../../src/services/tables/salesTransactionsService.js'

import {
  createDelivery,
  getDeliveryById,
  updateDelivery,
  deleteDelivery
} from '../../src/services/tables/deliveriesService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

describe('Supabase CRUD integration (deliveries)', () => {
  const client = hasSupabaseEnv ? getSupabaseClient() : null

  it('skips when SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY are not provided', async () => {
    if (hasSupabaseEnv) {
      expect(client).toBeTruthy()
      return
    }
    expect(client).toBeNull()
  })

  if (!hasSupabaseEnv) return

  it('deliveries: create -> read -> update -> delete -> delete non-existent', async () => {
    const branchId = 999007
    const staffId = '00000000-0000-4000-8000-000000000004'
    const salesId = 999007
    const deliveryId = 999007

    await createBranch(client, { branch_id: branchId, branch_name: 'Crud Delivery Branch' })
    await createStaff(client, { staff_id: staffId, username: 'crud_delivery_staff_1' })
    await createSalesTransaction(client, {
      sales_id: salesId,
      idempotency_key: 'crud_delivery_tx_idem_1'
    })

    const payload = {
      delivery_id: deliveryId,
      sales_id: salesId,
      status: 'Pending'
    }

    const created = await createDelivery(client, payload)
    expect(created.delivery_id).toBe(deliveryId)
    expect(created.status).toBe('Pending')

    const fetched = await getDeliveryById(client, deliveryId)
    expect(fetched).toBeTruthy()
    expect(fetched.status).toBe('Pending')

    const updated = await updateDelivery(client, deliveryId, { status: 'Delivered' })
    expect(updated.status).toBe('Delivered')

    await deleteDelivery(client, deliveryId)

    await expect(getDeliveryById(client, deliveryId)).resolves.toBeNull()
    await expect(deleteDelivery(client, deliveryId)).rejects.toThrow(/not found/i)

    await deleteSalesTransaction(client, salesId)
    await deleteStaff(client, staffId)
    await deleteBranch(client, branchId)
  })

  it('deliveries: create -> broken payload (validation)', async () => {
    await expect(
      createDelivery(client, {
        // missing delivery_id
        sales_id: 1,
        status: 'Pending'
      })
    ).rejects.toThrow(/Missing required field: delivery_id/i)

    await expect(
      createDelivery(client, {
        delivery_id: 1,
        sales_id: 'bad',
        status: 'Pending'
      })
    ).rejects.toThrow(/Invalid type for sales_id/i)

    await expect(
      createDelivery(client, {
        delivery_id: 1,
        sales_id: -1,
        status: 'Pending'
      })
    ).rejects.toThrow(/out of range/i)

    await expect(
      createDelivery(client, {
        delivery_id: 1,
        sales_id: 1,
        status: ''
      })
    ).rejects.toThrow(/too short/i)
  })

  it('deliveries: read -> broken id (validation)', async () => {
    await expect(getDeliveryById(client, 0)).rejects.toThrow(/Invalid value for delivery_id/i)
    await expect(getDeliveryById(client, 'x')).rejects.toThrow(/Invalid type for delivery_id/i)
  })

  it('deliveries: update -> broken payload (validation)', async () => {
    await expect(updateDelivery(client, 0, { status: 'x' })).rejects.toThrow(
      /Invalid value for delivery_id/i
    )

    await expect(updateDelivery(client, 1, {})).rejects.toThrow(/Missing required field: status/i)

    await expect(updateDelivery(client, 1, { status: 123 })).rejects.toThrow(/Invalid type for status/i)

    await expect(updateDelivery(client, 1, { status: ' ' })).rejects.toThrow(/too short/i)
  })

  it('deliveries: delete -> broken id (validation)', async () => {
    await expect(deleteDelivery(client, 0)).rejects.toThrow(/Invalid value for delivery_id/i)
    await expect(deleteDelivery(client, 'x')).rejects.toThrow(/Invalid type for delivery_id/i)
  })

  it('deliveries: delete -> non-existent entity', async () => {
    await expect(deleteDelivery(client, 989997)).rejects.toThrow(/not found/i)
  })
})

