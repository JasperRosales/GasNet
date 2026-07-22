import { Router } from 'express'
import { queryOne, queryAll, runStatement } from '../config/database.js'

const router = Router()

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const user = queryOne(
    'SELECT staff_id, branch_id, username, role FROM staff WHERE username = ? AND password = ?',
    [username, password]
  )

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  let branch = null
  if (user.branch_id) {
    branch = queryOne('SELECT * FROM branches WHERE branch_id = ?', [user.branch_id])
  }

  res.json({
    staff_id: user.staff_id,
    username: user.username,
    role: user.role,
    branch_id: user.branch_id,
    branch: branch
  })
})

router.get('/auth/staff', (req, res) => {
  const staff = queryAll(`
    SELECT s.staff_id, s.username, s.role, s.branch_id,
           b.branch_name
    FROM staff s
    LEFT JOIN branches b ON s.branch_id = b.branch_id
    ORDER BY s.staff_id
  `)
  res.json(staff)
})

router.post('/auth/staff', (req, res) => {
  const { username, password, role, branch_id } = req.body

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' })
  }

  const existing = queryOne('SELECT staff_id FROM staff WHERE username = ?', [username])
  if (existing) {
    return res.status(409).json({ error: 'Username already exists' })
  }

  const result = runStatement(
    'INSERT INTO staff (branch_id, username, password, role) VALUES (?, ?, ?, ?)',
    [branch_id || null, username, password, role]
  )

  res.status(201).json({
    staff_id: result.lastInsertRowid,
    username,
    role,
    branch_id: branch_id || null
  })
})

router.put('/auth/staff/:id', (req, res) => {
  const { username, password, role, branch_id } = req.body
  const staffId = Number(req.params.id)

  const existing = queryOne('SELECT staff_id FROM staff WHERE staff_id = ?', [staffId])
  if (!existing) {
    return res.status(404).json({ error: 'Staff not found' })
  }

  if (password) {
    runStatement('UPDATE staff SET username = ?, password = ?, role = ?, branch_id = ? WHERE staff_id = ?',
      [username, password, role, branch_id || null, staffId])
  } else {
    runStatement('UPDATE staff SET username = ?, role = ?, branch_id = ? WHERE staff_id = ?',
      [username, role, branch_id || null, staffId])
  }

  res.json({ staff_id: staffId, username, role, branch_id: branch_id || null })
})

router.delete('/auth/staff/:id', (req, res) => {
  const staffId = Number(req.params.id)

  const existing = queryOne('SELECT staff_id, role FROM staff WHERE staff_id = ?', [staffId])
  if (!existing) {
    return res.status(404).json({ error: 'Staff not found' })
  }

  if (existing.role === 'Admin') {
    return res.status(403).json({ error: 'Cannot delete admin account' })
  }

  runStatement('DELETE FROM staff WHERE staff_id = ?', [staffId])

  res.json({ message: 'Staff deleted' })
})

export default router
