export function assertPresent(value, fieldName) {
  if (value === undefined || value === null) {
    throw new Error(`Missing required field: ${fieldName}`)
  }
}

export function assertString(value, fieldName, { minLength = 1 } = {}) {
  assertPresent(value, fieldName)
  if (typeof value !== 'string') {
    throw new Error(`Invalid type for ${fieldName}: expected string`)
  }
  if (value.trim().length < minLength) {
    throw new Error(`Invalid value for ${fieldName}: too short`)
  }
}

export function assertNumber(
  value,
  fieldName,
  { integer = false, min = -Infinity, max = Infinity } = {}
) {
  assertPresent(value, fieldName)
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Invalid type for ${fieldName}: expected number`)
  }
  if (integer && !Number.isInteger(value)) {
    throw new Error(`Invalid value for ${fieldName}: expected integer`)
  }
  if (value < min || value > max) {
    throw new Error(`Invalid value for ${fieldName}: out of range`)
  }
}

export function validateRecord(record, schema) {
  // schema: { field: { type: 'string'|'number', ...opts } }
  if (!record || typeof record !== 'object') {
    throw new Error('Invalid record: expected object')
  }

  for (const [field, rules] of Object.entries(schema)) {
    const value = record[field]

    if (rules.type === 'string') {
      assertString(value, field, rules)
    } else if (rules.type === 'number') {
      assertNumber(value, field, rules)
    } else {
      throw new Error(`Unsupported validation type for field ${field}`)
    }
  }
}


