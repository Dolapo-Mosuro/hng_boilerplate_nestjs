import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const customDataSource = new DataSource({
  type: 'postgres',
  host: process.env.CUSTOM_DB_HOST,
  port: parseInt(process.env.CUSTOM_DB_PORT, 10),
  username: process.env.CUSTOM_DB_USERNAME,
  password: process.env.CUSTOM_DB_PASSWORD,
  database: process.env.CUSTOM_DB_NAME,
  entities: [process.env.CUSTOM_DB_ENTITIES],
  migrations: [process.env.CUSTOM_DB_MIGRATIONS],
  synchronize: isDevelopment,
  migrationsTableName: 'custom_migrations',
});

export async function initializeCustomDataSource() {
  if (!customDataSource.isInitialized) {
    try {
      await customDataSource.initialize();
      console.log('Custom Data Source has been initialized!');
    } catch (error) {
      console.error('Error during Custom Data Source initialization', error);
      process.exit(1);
    }
  }
  return customDataSource;
}

export default customDataSource;
