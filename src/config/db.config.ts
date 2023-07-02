export const databaseConfig = {
  host: process.env.CORE_API_HOST,
  username: process.env.CORE_API_USER,
  password: process.env.CORE_API_PASSWORD,
  database: process.env.CORE_API_DATABASE,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};