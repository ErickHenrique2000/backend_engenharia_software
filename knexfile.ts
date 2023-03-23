import type { Knex } from "knex";
import Environments from "./src/Environments";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host : Environments.DatabaseURL,
      port : Number(Environments.DatabasePort),
      user : Environments.DatabaseUser,
      password : Environments.DatabasePassword,
      database : Environments.DatabaseName
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `./src/Database/migrations`
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;
