import { assertNumber, assertString, validateRecord } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validateProductPayload(payload) {
  validateRecord(payload, {
    product_id: { type: 'number', integer: true, min: 1 },
    product_name: { type: 'string', minLength: 1 }
  })
}

export async function createProduct(client, payload) {
  try {
    validateProductPayload(payload)

    const { data, error } = await client
      .from('products')
      .insert({ product_id: payload.product_id, product_name: payload.product_name })
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Create product', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getProductById(client, product_id) {
  try {
    assertNumber(product_id, 'product_id', { integer: true, min: 1 })
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('product_id', product_id)
      .maybeSingle()

    if (error) throw wrapSupabaseError('Get product by id', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateProduct(client, product_id, payload) {
  try {
    assertNumber(product_id, 'product_id', { integer: true, min: 1 })
    if (!payload || typeof payload.product_name !== 'string') {
      throw new Error('Missing required field: product_name')
    }
    assertString(payload.product_name, 'product_name', { minLength: 1 })

    const { data, error } = await client
      .from('products')
      .update({ product_name: payload.product_name })
      .eq('product_id', product_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update product', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteProduct(client, product_id) {
  try {
    assertNumber(product_id, 'product_id', { integer: true, min: 1 })

    const existing = await getProductById(client, product_id)
    if (!existing) {
      throw new Error(`Delete product failed: product_id ${product_id} not found`)
    }

    const { error } = await client.from('products').delete().eq('product_id', product_id)
    if (error) throw wrapSupabaseError('Delete product', error)

    return true
  } catch (err) {
    throw err
  }
}

