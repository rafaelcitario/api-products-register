import { env } from './env'
import { knex as setupKnex, Knex } from 'knex'

const { DATABASE_URL, DATABASE_CLIENT, MIGRATION_URL, MIGRATION_EXT } = env

export const config: Knex.Config = {
  client: DATABASE_CLIENT,
  connection: {
    filename: DATABASE_URL,
  },
  migrations: {
    directory: MIGRATION_URL,
    extension: MIGRATION_EXT,
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
