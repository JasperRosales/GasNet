import { describe, it, expect } from 'vitest'
import { gasnetTables, getAllPosTablesData } from '../src/services/supabaseTablesService.js'

function createSupabaseClientStub(dataByTable = {}, errorByTable = {}) {
  return {
    from(tableName) {
      return {
        select() {
          if (errorByTable[tableName]) {
            return Promise.resolve({
              data: null,
              error: { message: errorByTable[tableName] }
            })
          }

          return Promise.resolve({
            data: dataByTable[tableName] ?? [],
            error: null
          })
        }
      }
    }
  }
}

describe('supabaseTablesService', () => {
  it('returns data for all schema tables', async () => {
    const dataByTable = {
      branches: [{ branch_id: 1, branch_name: 'Main Branch' }],
      staff: [{ staff_id: 'f4e8b5e7-41e7-45e5-b49d-6f1559ab4f42', username: 'admin' }],
      products: [{ product_id: 1, product_name: 'LPG 11kg' }],
      branch_product_prices: [{ branch_id: 1, product_id: 1, price: 1200 }],
      branch_stock: [{ stock_id: 1, branch_id: 1, product_id: 1, quantity: 50, reorder_level: 10 }],
      sales_transactions: [{ sales_id: 1, idempotency_key: 'order-1' }],
      deliveries: [{ delivery_id: 1, sales_id: 1, status: 'Pending' }]
    }
    const clientStub = createSupabaseClientStub(dataByTable)

    const result = await getAllPosTablesData(clientStub)

    expect(Object.keys(result)).toEqual(gasnetTables)
    expect(result).toEqual(dataByTable)
  })

  it('surfaces table-specific errors from supabase', async () => {
    const clientStub = createSupabaseClientStub({}, { deliveries: 'permission denied for table deliveries' })

    await expect(getAllPosTablesData(clientStub)).rejects.toThrow(
      'Failed to fetch "deliveries": permission denied for table deliveries'
    )
  })
})
