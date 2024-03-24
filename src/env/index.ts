import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.string().transform((port) => parseInt(port)),
  HOST: z.enum(['localhost', '127.0.0.1']).default('localhost'),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite3']).default('sqlite3'),
  MIGRATION_URL: z.string(),
  MIGRATION_EXT: z.enum(['ts', 'js']).default('ts'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Some enviroment variables is not found: ', _env.error.format())
  throw new Error(
    'Some enviroment variables is not found. Please check the above stack-trace ',
  )
}

export const env = _env.data
