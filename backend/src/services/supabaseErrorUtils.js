function getSupabaseErrorMessage(error) {
  if (!error) return 'Unknown Supabase error'

  // @supabase/supabase-js error object usually has: message, details, hint, status, code
  const parts = []
  if (error.message) parts.push(error.message)
  if (error.details) parts.push(`Details: ${error.details}`)
  if (error.hint) parts.push(`Hint: ${error.hint}`)

  const message = parts.length ? parts.join(' | ') : 'Supabase request failed'

  // Detect common error categories (best-effort)
  const lower = String(error.message || '').toLowerCase()
  if (lower.includes('timeout')) return `Database timeout: ${message}`
  if (
    lower.includes('permission') ||
    lower.includes('permission denied') ||
    lower.includes('rls')
  ) {
    return `Database permission error: ${message}`
  }
  if (lower.includes('violat') || lower.includes('constraint')) {
    return `Database constraint violation: ${message}`
  }

  if (error.status && (error.status === 401 || error.status === 403)) {
    return `Database auth/permission error: ${message}`
  }

  return message
}

export function wrapSupabaseError(operation, error) {
  const message = getSupabaseErrorMessage(error)
  return new Error(`${operation} failed: ${message}`)
}


