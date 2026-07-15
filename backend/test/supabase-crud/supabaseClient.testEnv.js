export function hasSupabaseEnv() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export function getSupabaseClientIfConfigured(getSupabaseClient) {
  if (!hasSupabaseEnv()) return null
  return getSupabaseClient()
}

