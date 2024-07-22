import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const dataSourceOptions = {
  type: 'postgres',
  host: process.env.CUSTOM_DB_HOST || process.env.DB_HOST,
  port: parseInt(process.env.CUSTOM_DB_PORT || process.env.DB_PORT, 10),
  username: process.env.CUSTOM_DB_USERNAME || process.env.DB_USERNAME,
  password: process.env.CUSTOM_DB_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.CUSTOM_DB_NAME || process.env.DB_DATABASE,
  entities: [process.env.CUSTOM_DB_ENTITIES || process.env.DB_ENTITIES],
  migrations: [process.env.CUSTOM_DB_MIGRATIONS || process.env.DB_MIGRATIONS],
  synchronize: isDevelopment,
  migrationsTableName: process.env.CUSTOM_MIGRATIONS_TABLE_NAME || 'migrations',
};
const dataSource = new DataSource(dataSourceOptions);

export async function initializeDataSource() {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
}

export default dataSource;
