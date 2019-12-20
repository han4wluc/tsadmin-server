const PRD_CONFIG = {};

const DEV_CONFIG = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'tsadmin',
  insecureAuth: true,
  synchronize: false,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  extra: { insecureAuth: true },
};

const TEST_CONFIG = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'ut',
  insecureAuth: true,
  synchronize: false,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  extra: { insecureAuth: true },
};

let config = PRD_CONFIG;

if (process.env.NODE_ENV === 'development') {
  config = DEV_CONFIG;
}

if (process.env.NODE_ENV === 'testing') {
  config = TEST_CONFIG;
}

module.exports = config;