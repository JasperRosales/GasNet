import express from 'express'
import { getSupabaseTables } from '../controllers/supabaseTablesController.js'

const router = express.Router()

router.get('/supabase/tables', getSupabaseTables)

export default router
