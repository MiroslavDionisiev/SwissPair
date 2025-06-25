import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { config as envConfig } from './src/config';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: envConfig.get('db'),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    ...knexSnakeCaseMappers(),
  },
};

export default knexConfig;
