import { assertNumber, assertString, validateRecord } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validateDeliveryPayload(payload) {
  validateRecord(payload, {
    delivery_id: { type: 'number', integer: true, min: 1 },
    sales_id: { type: 'number', integer: true, min: 1 },
    status: { type: 'string', minLength: 1 }
  })
}

export async function createDelivery(client, payload) {
  try {
    validateDeliveryPayload(payload)

    const { data, error } = await client
      .from('deliveries')
      .insert({ delivery_id: payload.delivery_id, sales_id: payload.sales_id, status: payload.status })
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Create delivery', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getDeliveryById(client, delivery_id) {
  try {
    assertNumber(delivery_id, 'delivery_id', { integer: true, min: 1 })

    const { data, error } = await client
      .from('deliveries')
      .select('*')
      .eq('delivery_id', delivery_id)
      .maybeSingle()

    if (error) throw wrapSupabaseError('Get delivery by id', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateDelivery(client, delivery_id, payload) {
  try {
    assertNumber(delivery_id, 'delivery_id', { integer: true, min: 1 })
    if (!payload || typeof payload.status !== 'string') {
      throw new Error('Missing required field: status')
    }
    assertString(payload.status, 'status', { minLength: 1 })

    const { data, error } = await client
      .from('deliveries')
      .update({ status: payload.status })
      .eq('delivery_id', delivery_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update delivery', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteDelivery(client, delivery_id) {
  try {
    assertNumber(delivery_id, 'delivery_id', { integer: true, min: 1 })

    const existing = await getDeliveryById(client, delivery_id)
    if (!existing) {
      throw new Error(`Delete delivery failed: delivery_id ${delivery_id} not found`)
    }

    const { error } = await client.from('deliveries').delete().eq('delivery_id', delivery_id)
    if (error) throw wrapSupabaseError('Delete delivery', error)

    return true
  } catch (err) {
    throw err
  }
}

