import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from '../services/job-listing.service';
import { Repository } from 'typeorm';
import { JobListing } from '../entities/job-listing.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateJobListingDto } from '../dtos/create-job-listing.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('JobsService', () => {
  let service: JobsService;
  let repository: Repository<JobListing>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(JobListing),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repository = module.get<Repository<JobListing>>(getRepositoryToken(JobListing));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createJobListing', () => {
    it('should successfully create a job listing', async () => {
      const createJobListingDto: CreateJobListingDto = {
        title: 'Test Job',
        description: 'Job Description',
        location: 'Location',
        salary: 'Salary',
        job_type: 'Full-time',
        company_name: 'Company',
      };
      const jobListing = new JobListing();
      jobListing.title = createJobListingDto.title;
      jobListing.description = createJobListingDto.description;
      jobListing.location = createJobListingDto.location;
      jobListing.salary = createJobListingDto.salary;
      jobListing.jobType = createJobListingDto.job_type;
      jobListing.companyName = createJobListingDto.company_name;
      const savedJobListing = { ...jobListing };

      jest.spyOn(repository, 'create').mockReturnValue(jobListing);
      jest.spyOn(repository, 'save').mockResolvedValue(savedJobListing);

      const result = await service.createJobListing(createJobListingDto);

      expect(result).toEqual({
        message: 'Job listing created successfully',
        status_code: 201,
        data: savedJobListing,
      });
    });

    it('should throw InternalServerErrorException if save fails', async () => {
      const createJobListingDto: CreateJobListingDto = {
        title: 'Test Job',
        description: 'Job Description',
        location: 'Location',
        salary: 'Salary',
        job_type: 'Full-time',
        company_name: 'Company',
      };
      jest.spyOn(repository, 'create').mockReturnValue(new JobListing());
      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Database error'));

      try {
        await service.createJobListing(createJobListingDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.getResponse()).toEqual({
          message: 'Failed to create job listing',
          status_code: 500,
        });
      }
    });
  });
});
