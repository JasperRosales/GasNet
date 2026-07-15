import { assertNumber, assertString, validateRecord } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validateSalesTransactionPayload(payload) {
  // Keep validation minimal but strict for required fields we know from mock/tests.
  validateRecord(payload, {
    sales_id: { type: 'number', integer: true, min: 1 },
    idempotency_key: { type: 'string', minLength: 1 }
  })
}

export async function createSalesTransaction(client, payload) {
  try {
    validateSalesTransactionPayload(payload)

    const { data, error } = await client
      .from('sales_transactions')
      .insert({ sales_id: payload.sales_id, idempotency_key: payload.idempotency_key })
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Create sales transaction', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getSalesTransactionById(client, sales_id) {
  try {
    assertNumber(sales_id, 'sales_id', { integer: true, min: 1 })

    const { data, error } = await client
      .from('sales_transactions')
      .select('*')
      .eq('sales_id', sales_id)
      .maybeSingle()

    if (error) throw wrapSupabaseError('Get sales transaction by id', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateSalesTransaction(client, sales_id, payload) {
  try {
    assertNumber(sales_id, 'sales_id', { integer: true, min: 1 })
    if (!payload || typeof payload.idempotency_key !== 'string') {
      throw new Error('Missing required field: idempotency_key')
    }
    assertString(payload.idempotency_key, 'idempotency_key', { minLength: 1 })

    const { data, error } = await client
      .from('sales_transactions')
      .update({ idempotency_key: payload.idempotency_key })
      .eq('sales_id', sales_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update sales transaction', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteSalesTransaction(client, sales_id) {
  try {
    assertNumber(sales_id, 'sales_id', { integer: true, min: 1 })

    const existing = await getSalesTransactionById(client, sales_id)
    if (!existing) {
      throw new Error(`Delete sales transaction failed: sales_id ${sales_id} not found`)
    }

    const { error } = await client.from('sales_transactions').delete().eq('sales_id', sales_id)
    if (error) throw wrapSupabaseError('Delete sales transaction', error)

    return true
  } catch (err) {
    throw err
  }
}

