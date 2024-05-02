#!/usr/bin/env node
import { Command } from 'commander'
import { getPackageInfo } from '@/utils/package-info.js'
import { add } from '@/commands/add.js'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const packageInfo = getPackageInfo()

  const program = new Command()
    .name('vdbs')
    .description('Add a migration schema to your Supabase project')
    .version(packageInfo.version || '0.0.1', '-v, --version', 'display the version number')

  program.addCommand(add)
  program.parse()
}

main()
