import { getSupabaseClient } from '../config/supabaseClient.js'
<<<<<<< HEAD
export const gasnetTables = [

=======

export const gasnetTables = [
>>>>>>> 2f805d250f222a61991c72257f02c55e875a24b2
  'branches',
  'staff',
  'products',
  'branch_product_prices',
  'branch_stock',
  'sales_transactions',
  'deliveries'
]

async function fetchTableRows(client, tableName) {
  const { data, error } = await client.from(tableName).select('*')

  if (error) {
    throw new Error(`Failed to fetch "${tableName}": ${error.message}`)
  }

<<<<<<< HEAD

=======
>>>>>>> 2f805d250f222a61991c72257f02c55e875a24b2
  return data
}

export async function getAllPosTablesData(client = getSupabaseClient()) {
  const tableEntries = await Promise.all(
    gasnetTables.map(async (tableName) => {
      const rows = await fetchTableRows(client, tableName)
      return [tableName, rows]
    })
  )

  return Object.fromEntries(tableEntries)
}
<<<<<<< HEAD

=======
>>>>>>> 2f805d250f222a61991c72257f02c55e875a24b2
