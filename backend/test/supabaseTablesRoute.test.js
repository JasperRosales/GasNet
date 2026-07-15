import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "../src/app.js";
import { getAllPosTablesData } from "../src/services/supabaseTablesService.js";

vi.mock('../src/services/supabaseTablesService.js', () => ({
  getAllPosTablesData: vi.fn()
}))

describe('GET /api/supabase/tables', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns all table payloads from supabase service', async () => {
    const tablesPayload = {
      branches: [],
      staff: [],
      products: [],
      branch_product_prices: [],
      branch_stock: [],
      sales_transactions: [],
      deliveries: []
    }
    getAllPosTablesData.mockResolvedValueOnce(tablesPayload)

    const res = await request(app).get('/api/supabase/tables').expect(200)

    expect(getAllPosTablesData).toHaveBeenCalledTimes(1)
    expect(res.body).toEqual({ tables: tablesPayload })
  })

  it('returns 500 when supabase service fails', async () => {
    getAllPosTablesData.mockRejectedValueOnce(new Error('Connection refused'))

    const res = await request(app).get('/api/supabase/tables').expect(500)

    expect(res.body).toEqual({
      message: 'Failed to retrieve table data from Supabase.',
      error: 'Connection refused'
    })
  })
})
