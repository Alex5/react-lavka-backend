export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    type: 'postgres' as const,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: Boolean(process.env.DB_SYNC),
  },
});
