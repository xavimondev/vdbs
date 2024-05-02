import path from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { execa } from 'execa'
import prompts from 'prompts'
import * as z from 'zod'
import { glob } from 'glob'
import { logger } from '@/utils/logger.js'
import { listCommands } from '@/utils/list-commands.js'
import { showNextSteps } from '@/utils/show-next-steps.js'
import { getSchema } from '@/utils/get-schema.js'
import { handleError } from '@/utils/handleError.js'

const addArgumentsSchema = z.object({
  generation: z.string().optional()
})

const promptSchema = z.object({
  path: z.string().trim().min(1)
})

export const add = new Command()
  .name('add')
  .arguments('[generation]')
  .description('Add Database Migration')
  .action(async (generation) => {
    try {
      const options = addArgumentsSchema.parse({ generation })
      let generationCode = options.generation
      if (!options.generation) {
        const { generation } = await prompts([
          {
            type: 'text',
            name: 'generation',
            message: 'Enter your generation code'
          }
        ])
        generationCode = generation
      }
      if (!generationCode) {
        logger.warn('Exiting due to no generation code provided')
        process.exit(0)
      }

      const schema = await getSchema(generationCode)
      const { data: schemaSql, error } = schema
      if (!schemaSql || error) {
        logger.error('The given generation code is wrong. Enter one valid.')
        process.exit(0)
      }

      // Looking for supabase path. I assume this cli is being running on a supabase project
      const cwd = path.resolve(process.cwd())
      let defaultDirectory = `${cwd}/supabase`
      // config.toml is the core file in supabase project
      const search = path.join(cwd, '**/supabase/config.toml')
      const result = await glob(search)
      const pathFound = result.at(0)
      if (pathFound) {
        defaultDirectory = path.dirname(pathFound)
      }
      const relativePath = path.relative(cwd, defaultDirectory)
      const config = await promptForConfig(relativePath)
      const pickedPath = config.path ?? relativePath

      // Let's check supabase folder existence
      if (!existsSync(pickedPath) && pickedPath !== 'supabase') {
        mkdirSync(pickedPath, {
          recursive: true
        })
      }

      // So, there's no supabase project, let's run supabase init to initialize supabse project
      if (!pathFound) {
        const spinner = ora(`Initializing Supabase project...`).start()
        // 1. Initialize supabase project
        const executeCommand = await listCommands(cwd)
        await execa(executeCommand, ['supabase@1.162.4', 'init'], {
          cwd: pickedPath === 'supabase' ? cwd : pickedPath
        })
        spinner.succeed()
      }

      const migrationSpinner = ora(`Adding migrations...`).start()
      // TODO: Find a better way to do this
      // 2. Create a folder migration...
      const migrationPath = path.join(
        `${
          pickedPath === 'supabase'
            ? `${cwd}/supabase`
            : pathFound
              ? pickedPath
              : `${pickedPath}/supabase`
        }`,
        'migrations'
      )

      if (!existsSync(migrationPath)) {
        mkdirSync(migrationPath, {
          recursive: true
        })
      }

      // 3. Add tables sql to migration file
      const now = new Date()
      const formattedTimestamp = now.toISOString().replace(/\D/g, '').slice(0, 14)
      const fileMigrationName = `${formattedTimestamp}_initial_state_schema.sql`

      writeFileSync(path.join(migrationPath, fileMigrationName), schemaSql, 'utf-8')
      migrationSpinner.succeed()
      logger.info(`${chalk.green('Success!')} Migration added successfully.`)
      logger.break()
      // 4. In order to deploy the migration remotely, user has to do the following...
      showNextSteps(Boolean(pathFound))
    } catch (error) {
      handleError(error)
    }
  })

export const promptForConfig = async (defaultDirectory: string) => {
  const highlight = (text: string) => chalk.cyan(text)
  const options = await prompts([
    {
      type: 'text',
      name: 'path',
      message: `Where would you like to add your ${highlight('migrations')} ?`,
      initial: defaultDirectory
    }
  ])
  const config = promptSchema.parse(options)
  return config
}
