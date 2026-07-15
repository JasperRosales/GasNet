import { assertNumber, validateRecord } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validateStockPayload(payload) {
  validateRecord(payload, {
    stock_id: { type: 'number', integer: true, min: 1 },
    branch_id: { type: 'number', integer: true, min: 1 },
    product_id: { type: 'number', integer: true, min: 1 },
    quantity: { type: 'number', min: 0 },
    reorder_level: { type: 'number', min: 0 }
  })
}

export async function createBranchStock(client, payload) {
  try {
    validateStockPayload(payload)

    const { data, error } = await client
      .from('branch_stock')
      .insert({
        stock_id: payload.stock_id,
        branch_id: payload.branch_id,
        product_id: payload.product_id,
        quantity: payload.quantity,
        reorder_level: payload.reorder_level
      })
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Create branch stock', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getBranchStockById(client, stock_id) {
  try {
    assertNumber(stock_id, 'stock_id', { integer: true, min: 1 })

    const { data, error } = await client
      .from('branch_stock')
      .select('*')
      .eq('stock_id', stock_id)
      .maybeSingle()

    if (error) throw wrapSupabaseError('Get branch stock by id', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateBranchStock(client, stock_id, payload) {
  try {
    assertNumber(stock_id, 'stock_id', { integer: true, min: 1 })

    const updatePayload = {
      quantity: payload?.quantity,
      reorder_level: payload?.reorder_level
    }

    assertNumber(updatePayload.quantity, 'quantity', { min: 0 })
    assertNumber(updatePayload.reorder_level, 'reorder_level', { min: 0 })

    const { data, error } = await client
      .from('branch_stock')
      .update(updatePayload)
      .eq('stock_id', stock_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update branch stock', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteBranchStock(client, stock_id) {
  try {
    assertNumber(stock_id, 'stock_id', { integer: true, min: 1 })

    const existing = await getBranchStockById(client, stock_id)
    if (!existing) {
      throw new Error(`Delete branch stock failed: stock_id ${stock_id} not found`)
    }

    const { error } = await client.from('branch_stock').delete().eq('stock_id', stock_id)
    if (error) throw wrapSupabaseError('Delete branch stock', error)

    return true
  } catch (err) {
    throw err
  }
}

