import { assertString, validateRecord } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validateStaffPayload(payload) {
  validateRecord(payload, {
    staff_id: { type: 'string', minLength: 1 },
    username: { type: 'string', minLength: 1 }
  })
}

export async function createStaff(client, payload) {
  try {
    validateStaffPayload(payload)

    const { data, error } = await client
      .from('staff')
      .insert({ staff_id: payload.staff_id, username: payload.username })
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Create staff', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getStaffById(client, staff_id) {
  try {
    assertString(staff_id, 'staff_id', { minLength: 1 })
    const { data, error } = await client
      .from('staff')
      .select('*')
      .eq('staff_id', staff_id)
      .maybeSingle()

    if (error) throw wrapSupabaseError('Get staff by id', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateStaff(client, staff_id, payload) {
  try {
    assertString(staff_id, 'staff_id', { minLength: 1 })

    if (!payload || typeof payload.username !== 'string') {
      throw new Error('Missing required field: username')
    }
    assertString(payload.username, 'username', { minLength: 1 })

    const { data, error } = await client
      .from('staff')
      .update({ username: payload.username })
      .eq('staff_id', staff_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update staff', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteStaff(client, staff_id) {
  try {
    assertString(staff_id, 'staff_id', { minLength: 1 })

    const existing = await getStaffById(client, staff_id)
    if (!existing) {
      throw new Error(`Delete staff failed: staff_id ${staff_id} not found`)
    }

    const { error } = await client.from('staff').delete().eq('staff_id', staff_id)
    if (error) throw wrapSupabaseError('Delete staff', error)

    return true
  } catch (err) {
    throw err
  }
}

