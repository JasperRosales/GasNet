import { validateRecord, assertNumber, assertString } from '../supabaseValidationUtils.js'
import { wrapSupabaseError } from '../supabaseErrorUtils.js'

function validateBranchPayload(payload) {
  validateRecord(payload, {
    branch_id: { type: 'number', integer: true, min: 1 },
    branch_name: { type: 'string', minLength: 1 }
  })
}

export async function createBranch(client, payload) {
  try {
    validateBranchPayload(payload)
    const { data, error } = await client.from('branches').insert({
      branch_id: payload.branch_id,
      branch_name: payload.branch_name
    }).select('*').single()

    if (error) throw wrapSupabaseError('Create branch', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function getBranchById(client, branch_id) {
  try {
    assertNumber(branch_id, 'branch_id', { integer: true, min: 1 })
    const { data, error } = await client.from('branches').select('*').eq('branch_id', branch_id).maybeSingle()

    if (error) throw wrapSupabaseError('Get branch by id', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function updateBranch(client, branch_id, payload) {
  try {
    assertNumber(branch_id, 'branch_id', { integer: true, min: 1 })
    const updatePayload = {
      branch_name: payload?.branch_name
    }

    if (updatePayload.branch_name === undefined) {
      throw new Error('Missing required field: branch_name')
    }
    assertString(updatePayload.branch_name, 'branch_name', { minLength: 1 })

    const { data, error } = await client
      .from('branches')
      .update(updatePayload)
      .eq('branch_id', branch_id)
      .select('*')
      .single()

    if (error) throw wrapSupabaseError('Update branch', error)
    return data
  } catch (err) {
    throw err
  }
}

export async function deleteBranch(client, branch_id) {
  try {
    assertNumber(branch_id, 'branch_id', { integer: true, min: 1 })

    const existing = await getBranchById(client, branch_id)
    if (!existing) {
      throw new Error(`Delete branch failed: branch_id ${branch_id} not found`)
    }

    const { error } = await client.from('branches').delete().eq('branch_id', branch_id)
    if (error) throw wrapSupabaseError('Delete branch', error)

    return true
  } catch (err) {
    throw err
  }
}

