import {DataSource} from "typeorm";

import envVars from "../declarations/envVars";

export const AppDataSource = new DataSource({
  type: envVars.database.type,
  host: envVars.database.host,
  port: envVars.database.port,
  username: envVars.database.username,
  password: envVars.database.password,
  database: envVars.database.database,
  synchronize: envVars.database.synchronize,
  logging: envVars.database.logging,
  entities: [],
  subscribers: [],
  migrations: [],
})