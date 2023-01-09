export default {
  port: process.env.port || "4000",
  database: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "dashapp",
    synchronize: true,
    logging: true,
  }
} as const;