import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import {
  createBranch,
  getBranchById,
  updateBranch,
  deleteBranch
} from '../../src/services/tables/branchesService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

describe('Supabase CRUD integration (branches)', () => {
  const client = hasSupabaseEnv ? getSupabaseClient() : null

  it('skips when SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY are not provided', async () => {
    if (hasSupabaseEnv) {
      expect(client).toBeTruthy()
      return
    }
    expect(client).toBeNull()
  })

  if (!hasSupabaseEnv) return

  it('branches: create -> read -> update -> delete -> delete non-existent', async () => {
    const branchPayload = {
      branch_id: 999002,
      branch_name: 'Crud Branch (Ob3W4D2)'
    }

    const created = await createBranch(client, branchPayload)
    expect(created.branch_id).toBe(branchPayload.branch_id)

    const fetched = await getBranchById(client, branchPayload.branch_id)
    expect(fetched).toBeTruthy()
    expect(fetched.branch_name).toBe(branchPayload.branch_name)

    const updated = await updateBranch(client, branchPayload.branch_id, {
      branch_name: 'Crud Branch Updated (Ob3W4D2)'
    })
    expect(updated.branch_name).toBe('Crud Branch Updated (Ob3W4D2)')

    await deleteBranch(client, branchPayload.branch_id)

    await expect(getBranchById(client, branchPayload.branch_id)).resolves.toBeNull()
    await expect(deleteBranch(client, branchPayload.branch_id)).rejects.toThrow(/not found/i)
  })

  it('branches: create -> broken payload (validation)', async () => {
    await expect(
      createBranch(client, {
        // missing branch_id
        branch_name: 'Invalid branch'
      })
    ).rejects.toThrow(/Missing required field: branch_id/i)

    await expect(
      createBranch(client, {
        branch_id: 'not-a-number',
        branch_name: 'Invalid branch'
      })
    ).rejects.toThrow(/Invalid type for branch_id/i)

    await expect(
      createBranch(client, {
        branch_id: -1,
        branch_name: 'Invalid branch'
      })
    ).rejects.toThrow(/out of range/i)

    await expect(
      createBranch(client, {
        branch_id: 123,
        branch_name: ''
      })
    ).rejects.toThrow(/too short/i)
  })

  it('branches: read -> broken id (validation)', async () => {
    await expect(getBranchById(client, 0)).rejects.toThrow(/Invalid value for branch_id/i)
    await expect(getBranchById(client, 'x')).rejects.toThrow(/Invalid type for branch_id/i)
  })

  it('branches: update -> broken payload (validation)', async () => {
    // invalid branch_id
    await expect(updateBranch(client, 0, { branch_name: 'x' })).rejects.toThrow(
      /Invalid value for branch_id/i
    )

    // missing required field
    await expect(updateBranch(client, 1, {})).rejects.toThrow(/Missing required field: branch_name/i)

    // invalid type for required field
    await expect(updateBranch(client, 1, { branch_name: 123 })).rejects.toThrow(
      /Invalid type for branch_name/i
    )

    // too short
    await expect(updateBranch(client, 1, { branch_name: ' ' })).rejects.toThrow(/too short/i)
  })

  it('branches: delete -> broken id (validation)', async () => {
    await expect(deleteBranch(client, 0)).rejects.toThrow(/Invalid value for branch_id/i)
    await expect(deleteBranch(client, 'x')).rejects.toThrow(/Invalid type for branch_id/i)
  })

  it('branches: delete -> non-existent entity', async () => {
    const nonExistentId = 989999
    await expect(deleteBranch(client, nonExistentId)).rejects.toThrow(/not found/i)
  })
})

