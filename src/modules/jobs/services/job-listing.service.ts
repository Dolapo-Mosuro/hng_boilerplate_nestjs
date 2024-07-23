import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListing } from '../../../entities/job-listing.entity';
import { CreateJobListingDto } from '../dtos/create-job-listing.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobListing)
    private readonly jobListingRepository: Repository<JobListing>
  ) {}
  async createJobListing(createJobListingDto: CreateJobListingDto) {
    const jobListing = this.jobListingRepository.create(createJobListingDto);

    try {
      const savedJobListing = await this.jobListingRepository.save(jobListing);
      return {
        message: 'Job listing created successfully',
        status_code: 201,
        data: savedJobListing,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Invalid request data',
        status: 400,
      });
    }
  }
}
