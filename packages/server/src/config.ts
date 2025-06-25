import convict from 'convict';
import { config as envConfig } from 'dotenv';

envConfig();

const config = convict({
  server: {
    port: {
      doc: 'Server port',
      format: 'port',
      default: 3000,
      env: 'SWISSPAIR_SERVER_PORT',
    },
  },
  client: {
    baseUrl: {
      doc: 'Client base url',
      format: '*',
      default: '127.0.0.1:3001',
      env: 'SWISSPAIR_CLIENT_BASE_URL',
    },
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: '127.0.0.1',
      env: 'SWISSPAIR_DATABASE_HOST',
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'SWISSPAIR_DATABASE_PORT',
    },
    database: {
      doc: 'Database name',
      format: String,
      default: 'SWISSPAIR',
      env: 'SWISSPAIR_DATABASE_NAME',
    },
    user: {
      doc: 'Database username',
      format: String,
      default: 'postgres',
      env: 'SWISSPAIR_DATABASE_USER',
    },
    password: {
      doc: 'Database user password',
      format: String,
      default: 'postgres',
      env: 'SWISSPAIR_DATABASE_PASSWORD',
    },
  }
});

config.validate({ allowed: 'strict' });

export { config };
