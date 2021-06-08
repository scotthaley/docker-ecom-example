// Update with your config settings.
require('dotenv').config({path: '.env'});

const {DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_PORT} = process.env;

module.exports = {

  development: {
    client: 'pg',
    connection: `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT || '5432'}/${DATABASE_NAME}`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
