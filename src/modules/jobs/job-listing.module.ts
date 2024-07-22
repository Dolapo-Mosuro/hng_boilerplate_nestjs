import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobListing } from './entities/job-listing.entity';
import { JobsService } from './services/job-listing.service';
import { JobsController } from './controllers/job-listing.controller';
import customDataSource, { initializeCustomDataSource } from '../custom/custom-data-source';
@Module({
  imports: [TypeOrmModule.forFeature([JobListing])],
  providers: [
    JobsService,
    {
      provide: 'CUSTOM_DATA_SOURCE',
      useFactory: async () => await initializeCustomDataSource(),
    },
  ],
  controllers: [JobsController],
})
export class JobsModule {}
