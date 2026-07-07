import { fetchSalesAnalyticsReports, fetchSyncStatus } from '../src/services/api'
import { vi, describe, afterEach, expect, it } from 'vitest'

describe('fetchSyncStatus', () => {
  const OLD = globalThis.fetch
  afterEach(() => { globalThis.fetch = OLD })

  it('returns json when response ok', async () => {
    const payload = { syncStatus: 'synchronized' }
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(payload) }))
    const res = await fetchSyncStatus()
    expect(res).toEqual(payload)
  })

  it('throws on network error', async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false }))
    await expect(fetchSyncStatus()).rejects.toThrow()
  })
})

describe('fetchSalesAnalyticsReports', () => {
  const OLD = globalThis.fetch
  afterEach(() => { globalThis.fetch = OLD })

  it('returns analytics json when response ok', async () => {
    const payload = {
      weekly: { scope: 'weekly' },
      monthly: { scope: 'monthly' },
      annual: { scope: 'annual' }
    }
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(payload) }))
    const res = await fetchSalesAnalyticsReports()
    expect(res).toEqual(payload)
  })

  it('throws on network error', async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false }))
    await expect(fetchSalesAnalyticsReports()).rejects.toThrow()
  })
})
