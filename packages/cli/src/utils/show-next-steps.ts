import { logger } from '@/utils/logger.js'

export const showNextSteps = (projectExists: boolean) => {
  logger.info('Next Steps:')
  if (!projectExists) {
    console.log('supabase login')
    console.log('supabase link --project-ref YOUR_PROJECT_ID')
  }

  // In case the user has already set up a Supabase project, simply push the migration
  console.log('supabase db push --linked')
}
