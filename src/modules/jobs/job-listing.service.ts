import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListing } from './job-listing.entity';
import { CreateJobListingDto } from './create-job-listing.dto';

interface JobCreationResponse {
  message: string;
  status_code: HttpStatus;
  data: JobListing;
}

@Injectable()
export class JobsService {
  createJobListing(createJobListingDto: CreateJobListingDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(JobListing)
    private readonly jobRepository: Repository<JobListing>
  ) {}

  async createJob(createJobListingDto: CreateJobListingDto): Promise<JobCreationResponse> {
    try {
      const jobListing = await this.jobRepository.create(createJobListingDto);
      await this.jobRepository.save(jobListing); // Make sure to save the new job listing
      return {
        message: 'Job listing created successfully',
        status_code: HttpStatus.CREATED,
        data: jobListing,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Invalid request data',
        status: 400,
      });
    }
  }
}
