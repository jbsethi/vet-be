
import "reflect-metadata";

import logger from '../shared/logger';
import { AppDataSource } from "./dataSource";

export async function intializeDB(): Promise<void> {
  await AppDataSource.initialize();
  logger.info('Database successfully initialized');
}