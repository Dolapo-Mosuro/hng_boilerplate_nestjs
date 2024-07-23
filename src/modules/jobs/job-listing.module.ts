import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobListing } from '../../entities/job-listing.entity';
import { JobsService } from './services/job-listing.service';
import { JobsController } from './controllers/job-listing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobListing], 'customConnection')],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
