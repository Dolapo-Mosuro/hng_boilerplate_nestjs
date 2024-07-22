import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import customDataSource, { initializeCustomDataSource } from './custom-data-source';
import { CustomService } from './custom.service';
import { CustomController } from './custom.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'customConnection',
      useFactory: async () => ({
        ...customDataSource.options,
      }),
      dataSourceFactory: async () => customDataSource,
    }),
    TypeOrmModule.forFeature(
      [
        /* Your entities here */
      ],
      'customConnection'
    ),
  ],
  providers: [CustomService],
  controllers: [CustomController],
})
export class CustomModule {}
