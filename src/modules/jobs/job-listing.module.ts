import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobListing } from './job-listing.entity';
import { JobsService } from './job-listing.service';
import { JobsController } from './job-listing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobListing])],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
