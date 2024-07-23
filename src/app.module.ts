import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsModule } from './modules/jobs/job-listing.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
import serverConfig from '../config/server.config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './database/data-source';
import { SeedingModule } from './database/seeding/seeding.module';
import HealthController from './health.controller';
import customDataSource from './modules/custom/custom-data-source';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  providers: [
    {
      provide: 'CONFIG',
      useClass: ConfigService,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
    },
  ],
  imports: [
    ConfigModule.forRoot({
      /**
       * By default, the package looks for a .env file in the root directory of the application.
       * We don't use ".env" file because it is prioritize as the same level as real environment variables.
       * To specify multiple .env files, set the envFilePath property.
       * If a variable is found in multiple files, the first one takes precedence.
       */
      envFilePath: ['.env.development.local', `.env.${process.env.PROFILE}`],
      isGlobal: true,
      load: [serverConfig],
      /**
       * See ".env.local" file to list all environment variables needed by the app
       */
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').required(),
        PROFILE: Joi.string().valid('local', 'development', 'production', 'ci', 'testing', 'staging').required(),
        PORT: Joi.number().required(),
      }),
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => dataSource,
    }),
    TypeOrmModule.forRootAsync({
      name: 'customconnection',
      useFactory: async () => ({
        ...customDataSource.options,
      }),
      dataSourceFactory: async () => customDataSource,
    }),
    JobsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),

    SeedingModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
