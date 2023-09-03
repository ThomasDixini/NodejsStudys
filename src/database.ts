import knex, { type Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const k = knex(config)
