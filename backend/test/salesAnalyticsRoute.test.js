import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from "../src/app.js";

describe('GET /api/sales-analytics', () => {
  it('returns weekly, monthly, and annual analytics reports', async () => {
    const res = await request(app).get('/api/sales-analytics').expect(200)

    expect(res.body).toHaveProperty('weekly')
    expect(res.body).toHaveProperty('monthly')
    expect(res.body).toHaveProperty('annual')

    expect(res.body.weekly).toMatchObject({
      scope: 'weekly'
    })
    expect(res.body.monthly).toMatchObject({
      scope: 'monthly'
    })
    expect(res.body.annual).toMatchObject({
      scope: 'annual'
    })
  })
})
