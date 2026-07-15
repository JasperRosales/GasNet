import { assertNumber, validateRecord } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validatePricePayload(payload) {
  validateRecord(payload, {
    branch_id: { type: 'number', integer: true, min: 1 },
    product_id: { type: 'number', integer: true, min: 1 },
    price: { type: 'number', min: 0 }
  })
}

export async function createBranchProductPrice(client, payload) {
  try {
    validatePricePayload(payload)

    const { data, error } = await client
      .from('branch_product_prices')
      .insert({
        branch_id: payload.branch_id,
        product_id: payload.product_id,
        price: payload.price
      })
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Create branch product price', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getBranchProductPrice(client, branch_id, product_id) {
  try {
    assertNumber(branch_id, 'branch_id', { integer: true, min: 1 })
    assertNumber(product_id, 'product_id', { integer: true, min: 1 })

    const { data, error } = await client
      .from('branch_product_prices')
      .select('*')
      .eq('branch_id', branch_id)
      .eq('product_id', product_id)
      .maybeSingle()

    if (error) throw wrapSupabaseError('Get branch product price', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateBranchProductPrice(client, branch_id, product_id, payload) {
  try {
    assertNumber(branch_id, 'branch_id', { integer: true, min: 1 })
    assertNumber(product_id, 'product_id', { integer: true, min: 1 })
    if (!payload || typeof payload.price !== 'number') {
      throw new Error('Missing required field: price')
    }
    assertNumber(payload.price, 'price', { min: 0 })

    const { data, error } = await client
      .from('branch_product_prices')
      .update({ price: payload.price })
      .eq('branch_id', branch_id)
      .eq('product_id', product_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update branch product price', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteBranchProductPrice(client, branch_id, product_id) {
  try {
    assertNumber(branch_id, 'branch_id', { integer: true, min: 1 })
    assertNumber(product_id, 'product_id', { integer: true, min: 1 })

    const existing = await getBranchProductPrice(client, branch_id, product_id)
    if (!existing) {
      throw new Error(
        `Delete branch product price failed: branch_id ${branch_id} / product_id ${product_id} not found`
      )
    }

    const { error } = await client
      .from('branch_product_prices')
      .delete()
      .eq('branch_id', branch_id)
      .eq('product_id', product_id)

    if (error) throw wrapSupabaseError('Delete branch product price', error)
    return true
  } catch (err) {
    throw err
  }
}

