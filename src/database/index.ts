
import "reflect-metadata";
import { runSeeders } from "typeorm-extension";

import logger from '../shared/logger';
import { AppDataSource } from "./dataSource";

export async function intializeDB(): Promise<void> {
  await AppDataSource.initialize();
  logger.info('Database successfully initialized');

  await runSeeders(AppDataSource, {
    seeds: ['src/components/**/seeder{.ts,.js}'],
    factories: ['src/components/**/factory{.ts,.js}']
  });
  logger.info('Database successfully Seeded');
}