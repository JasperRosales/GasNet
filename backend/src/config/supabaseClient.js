let cachedClient

function getSupabaseEnvironment() {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL in environment variables.')
  }

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment variables.')
  }

  return { supabaseUrl, serviceRoleKey }
}

export async function getSupabaseClient() {

  // Avoid executing Supabase SDK import-time logic during test discovery.
  // If env vars are not configured, return null and let callers decide to skip.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }

  if (!cachedClient) {
    // Lazy import to prevent import-time crashes when env vars are missing.
    const { createClient } = await import('@supabase/supabase-js')


    const { supabaseUrl, serviceRoleKey } = getSupabaseEnvironment()
    cachedClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  }

  return cachedClient
}

export function resetSupabaseClientForTests() {
  cachedClient = undefined
}

