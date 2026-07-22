import { getDatabase, queryOne, runStatement } from './database.js'

export function seedDatabase() {
  const existing = queryOne('SELECT COUNT(*) as count FROM branches')
  if (existing.count > 0) {
    return false
  }

  const branches = [
    ['Bayan', 'Bayan, Batangas', '043-123-4567'],
    ['Gulod', 'Gulod, Batangas', '043-234-5678'],
    ['Cuenca', 'Cuenca, Batangas', '043-345-6789'],
    ['Caloocan', 'Caloocan, Batangas', '043-456-7890'],
    ['Agoncillo', 'Agoncillo, Batangas', '043-567-8901'],
    ['Sta. Teresita', 'Sta. Teresita, Batangas', '043-678-9012']
  ]

  const products = [
    ['LPG 2.7kg', 2.7, 1],
    ['LPG 11kg', 11, 1],
    ['LPG 22kg', 22, 1],
    ['LPG 50kg', 50, 1]
  ]

  const staffList = [
    [null, 'admin@gmail.com', 'admin@123', 'Admin'],
    [1, 'bayan', 'bayan123', 'Staff'],
    [2, 'gulod', 'gulod123', 'Staff'],
    [3, 'cuenca', 'cuenca123', 'Staff'],
    [4, 'caloocan', 'caloocan123', 'Staff'],
    [5, 'agoncillo', 'agoncillo123', 'Staff'],
    [6, 'sta.teresita', 'stateresita123', 'Staff']
  ]

  for (const b of branches) {
    runStatement('INSERT INTO branches (branch_name, location, contact_no) VALUES (?, ?, ?)', b)
  }

  for (const p of products) {
    runStatement('INSERT INTO products (product_name, weight_kg, active) VALUES (?, ?, ?)', p)
  }

  const prices = [
    [1, 1, 180], [1, 2, 650], [1, 3, 1200], [1, 4, 2800],
    [2, 1, 185], [2, 2, 660], [2, 3, 1220], [2, 4, 2850],
    [3, 1, 175], [3, 2, 640], [3, 3, 1180], [3, 4, 2780],
    [4, 1, 190], [4, 2, 670], [4, 3, 1250], [4, 4, 2900],
    [5, 1, 170], [5, 2, 630], [5, 3, 1170], [5, 4, 2750],
    [6, 1, 182], [6, 2, 655], [6, 3, 1210], [6, 4, 2820]
  ]

  for (const p of prices) {
    runStatement('INSERT INTO branch_product_prices (branch_id, product_id, price) VALUES (?, ?, ?)', p)
  }

  const stockLevels = [
    [1, 1, 50, 10], [1, 2, 35, 8], [1, 3, 20, 5], [1, 4, 8, 3],
    [2, 1, 40, 10], [2, 2, 25, 8], [2, 3, 15, 5], [2, 4, 6, 3],
    [3, 1, 45, 10], [3, 2, 30, 8], [3, 3, 18, 5], [3, 4, 4, 3],
    [4, 1, 55, 10], [4, 2, 40, 8], [4, 3, 25, 5], [4, 4, 10, 3],
    [5, 1, 30, 10], [5, 2, 20, 8], [5, 3, 12, 5], [5, 4, 2, 3],
    [6, 1, 42, 10], [6, 2, 28, 8], [6, 3, 16, 5], [6, 4, 5, 3]
  ]

  for (const s of stockLevels) {
    runStatement('INSERT INTO branch_stock (branch_id, product_id, quantity, reorder_level) VALUES (?, ?, ?, ?)', s)
  }

  for (const s of staffList) {
    runStatement('INSERT INTO staff (branch_id, username, password, role) VALUES (?, ?, ?, ?)', s)
  }

  return true
}
