import {DataSource, DataSourceOptions} from "typeorm";
import { SeederOptions } from 'typeorm-extension';

import envVars from "../declarations/envVars";

export const DataSourceOpts: DataSourceOptions & SeederOptions = {
  type: envVars.database.type,
  host: envVars.database.host,
  port: envVars.database.port,
  username: envVars.database.username,
  password: envVars.database.password,
  database: envVars.database.database,
  synchronize: envVars.database.synchronize,
  logging: envVars.database.logging,
  entities: [
    'src/components/**/entity.ts'
  ],
  seeds: ['src/components/**/seeder{.ts,.js}'],
  factories: ['src/components/**/factory{.ts,.js}'],
  subscribers: [],
  migrations: [],
}

export const AppDataSource = new DataSource(DataSourceOpts)