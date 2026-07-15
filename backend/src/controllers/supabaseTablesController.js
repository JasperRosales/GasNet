import { getAllPosTablesData } from '../services/supabaseTablesService.js'

export async function getSupabaseTables(req, res) {
  try {
    const tables = await getAllPosTablesData()

    return res.status(200).json({
      tables
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve table data from Supabase.',
      error: error.message
    })
  }
}
