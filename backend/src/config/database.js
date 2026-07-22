import initSqlJs from 'sql.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', '..', 'data', 'gasnet.db')

let db = null

export async function getDatabase() {
  if (db) return db

  const SQL = await initSqlJs()

  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH)
    db = new SQL.Database(buffer)
  } else {
    db = new SQL.Database()
  }

  db.run('PRAGMA journal_mode = WAL')
  db.run('PRAGMA foreign_keys = ON')

  initializeSchema(db)
  saveDatabase()

  return db
}

export function saveDatabase() {
  if (!db) return
  const data = db.export()
  const buffer = Buffer.from(data)
  fs.writeFileSync(DB_PATH, buffer)
}

export function closeDatabase() {
  if (db) {
    saveDatabase()
    db.close()
    db = null
  }
}

function initializeSchema(database) {
  database.run(`
    CREATE TABLE IF NOT EXISTS branches (
      branch_id INTEGER PRIMARY KEY AUTOINCREMENT,
      branch_name TEXT NOT NULL UNIQUE,
      location TEXT NOT NULL,
      contact_no TEXT NOT NULL
    )
  `)
  database.run(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL UNIQUE,
      weight_kg INTEGER NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    )
  `)
  database.run(`
    CREATE TABLE IF NOT EXISTS branch_product_prices (
      branch_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      price INTEGER NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (branch_id, product_id),
      FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )
  `)
  database.run(`
    CREATE TABLE IF NOT EXISTS branch_stock (
      stock_id INTEGER PRIMARY KEY AUTOINCREMENT,
      branch_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      reorder_level INTEGER NOT NULL DEFAULT 10,
      UNIQUE (branch_id, product_id),
      FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )
  `)
  database.run(`
    CREATE TABLE IF NOT EXISTS staff (
      staff_id INTEGER PRIMARY KEY AUTOINCREMENT,
      branch_id INTEGER,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('Admin', 'Staff', 'Manager')),
      FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
    )
  `)
  database.run(`
    CREATE TABLE IF NOT EXISTS sales_transactions (
      sales_id INTEGER PRIMARY KEY AUTOINCREMENT,
      idempotency_key TEXT NOT NULL,
      tracking_no TEXT,
      guest_name TEXT NOT NULL,
      guest_phone TEXT,
      delivery_address TEXT,
      transaction_date TEXT DEFAULT CURRENT_DATE,
      branch_id INTEGER NOT NULL,
      staff_id INTEGER NOT NULL,
      transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Instore', 'Commercial')),
      subtotal INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      UNIQUE (branch_id, idempotency_key),
      FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
      FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
    )
  `)
  database.run(`
    CREATE TABLE IF NOT EXISTS deliveries (
      delivery_id INTEGER PRIMARY KEY AUTOINCREMENT,
      sales_id INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Pending', 'Out for Delivery', 'Delivered', 'Cancelled')),
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sales_id) REFERENCES sales_transactions(sales_id)
    )
  `)
}

export function queryAll(sql, params = []) {
  const stmt = db.prepare(sql)
  if (params.length > 0) stmt.bind(params)
  const results = []
  while (stmt.step()) {
    results.push(stmt.getAsObject())
  }
  stmt.free()
  return results
}

export function queryOne(sql, params = []) {
  const stmt = db.prepare(sql)
  if (params.length > 0) stmt.bind(params)
  let result = null
  if (stmt.step()) {
    result = stmt.getAsObject()
  }
  stmt.free()
  return result
}

export function runStatement(sql, params = []) {
  db.run(sql, params)
  const lastId = queryOne('SELECT last_insert_rowid() as id')
  const changes = db.getRowsModified()
  saveDatabase()
  return { lastInsertRowid: lastId?.id, changes }
}

export function resetDatabase() {
  closeDatabase()
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH)
  }
  db = null
  return getDatabase()
}
