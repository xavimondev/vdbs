type ValidationResult = {
  isValid: boolean
  errorMessage: string
}

export const validateNeonConnectionString = (connectionString: string): ValidationResult => {
  // postgresql://[ROLE]:[PASSWORD]@[INSTANCE].[REGION].[PROVIDER].neon.tech/neondb?sslmode=require
  const neonPattern = /^postgresql:\/\/([^:]+):([^@]+)@/

  if (!connectionString) {
    return {
      isValid: false,
      errorMessage: 'Connection string cannot be empty.'
    }
  }

  if (!neonPattern.test(connectionString)) {
    return {
      isValid: false,
      errorMessage: 'Invalid format. Must follow the pattern.'
    }
  }

  // Validaciones adicionales específicas para Neon
  if (
    connectionString.includes('[ROLE]') ||
    connectionString.includes('[PASSWORD]') ||
    connectionString.includes('[INSTANCE]') ||
    connectionString.includes('[REGION]') ||
    connectionString.includes('[PROVIDER]')
  ) {
    return {
      isValid: false,
      errorMessage:
        'Replace the placeholders [ROLE], [PASSWORD], [INSTANCE], [REGION] y [PROVIDER] con tus datos reales'
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  }
}

export const validateSupabaseConnectionString = (connectionString: string): ValidationResult => {
  // postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-ID].supabase.co:5432/postgres
  const supabasePattern = /^postgresql:\/\/postgres:[^@]+@db\.[^.]+\.supabase\.co:5432\/postgres$/

  if (!connectionString) {
    return {
      isValid: false,
      errorMessage: 'Connection string cannot be empty'
    }
  }

  if (!supabasePattern.test(connectionString)) {
    return {
      isValid: false,
      errorMessage:
        'Invalid format. Must follow the pattern: postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-ID].supabase.co:5432/postgres'
    }
  }

  // Validaciones adicionales específicas para Supabase
  if (
    connectionString.includes('[YOUR-PASSWORD]') ||
    connectionString.includes('[YOUR-SUPABASE-ID]')
  ) {
    return {
      isValid: false,
      errorMessage:
        'Replace the placeholders [YOUR-PASSWORD] and [YOUR-SUPABASE-ID] with your actual data'
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  }
}
