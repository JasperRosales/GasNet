import { describe, it, expect } from 'vitest'
import { getSupabaseClient } from '../../src/config/supabaseClient.js'

import {
  createStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} from '../../src/services/tables/staffService.js'

import { createBranch, deleteBranch } from '../../src/services/tables/branchesService.js'

const hasSupabaseEnv = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

describe('Supabase CRUD integration (staff)', () => {
  const client = hasSupabaseEnv ? getSupabaseClient() : null

  it('skips when SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY are not provided', async () => {
    if (hasSupabaseEnv) {
      expect(client).toBeTruthy()
      return
    }
    expect(client).toBeNull()
  })

  if (!hasSupabaseEnv) return

  it('staff: create -> read -> update -> delete -> delete non-existent', async () => {
    // staff has FK to branches in this schema (tests create branch first)
    const branchId = 999003
    await createBranch(client, { branch_id: branchId, branch_name: 'Crud Staff Branch' })

    const staffPayload = {
      staff_id: '00000000-0000-4000-8000-000000000002',
      username: 'crud_staff_user_1'
    }

    const created = await createStaff(client, staffPayload)
    expect(created.staff_id).toBe(staffPayload.staff_id)
    expect(created.username).toBe(staffPayload.username)

    const fetched = await getStaffById(client, staffPayload.staff_id)
    expect(fetched).toBeTruthy()
    expect(fetched.username).toBe(staffPayload.username)

    const updated = await updateStaff(client, staffPayload.staff_id, {
      username: 'crud_staff_user_1_updated'
    })
    expect(updated.username).toBe('crud_staff_user_1_updated')

    await deleteStaff(client, staffPayload.staff_id)

    await expect(getStaffById(client, staffPayload.staff_id)).resolves.toBeNull()
    await expect(deleteStaff(client, staffPayload.staff_id)).rejects.toThrow(/not found/i)

    await deleteBranch(client, branchId)
    await expect(getStaffById(client, staffPayload.staff_id)).resolves.toBeNull()
  })

  it('staff: create -> broken payload (validation)', async () => {
    const branchId = 999011
    await createBranch(client, { branch_id: branchId, branch_name: 'Crud Staff Branch invalid' })

    await expect(
      createStaff(client, {
        // missing staff_id
        username: 'invalid'
      })
    ).rejects.toThrow(/Missing required field: staff_id/i)

    await expect(
      createStaff(client, {
        staff_id: 123,
        username: 'invalid'
      })
    ).rejects.toThrow(/Invalid type for staff_id/i)

    await expect(
      createStaff(client, {
        staff_id: '00000000-0000-4000-8000-000000000099',
        username: ''
      })
    ).rejects.toThrow(/too short/i)

    await deleteBranch(client, branchId)
  })

  it('staff: read -> broken id (validation)', async () => {
    await expect(getStaffById(client, '')).rejects.toThrow(/Invalid type for staff_id|too short/i)
  })

  it('staff: update -> broken payload (validation)', async () => {
    await expect(updateStaff(client, '', { username: 'x' })).rejects.toThrow(/Invalid type for staff_id/i)

    await expect(updateStaff(client, '00000000-0000-4000-8000-000000000001', {})).rejects.toThrow(
      /Missing required field: username/i
    )

    await expect(
      updateStaff(client, '00000000-0000-4000-8000-000000000001', { username: 123 })
    ).rejects.toThrow(/Invalid type for username/i)

    await expect(
      updateStaff(client, '00000000-0000-4000-8000-000000000001', { username: ' ' })
    ).rejects.toThrow(/too short/i)
  })

  it('staff: delete -> broken id (validation)', async () => {
    await expect(deleteStaff(client, '')).rejects.toThrow(/Invalid type for staff_id|too short/i)
  })

  it('staff: delete -> non-existent entity', async () => {
    await expect(deleteStaff(client, '00000000-0000-4000-8000-000000000099')).rejects.toThrow(
      /not found/i
    )
  })
})

