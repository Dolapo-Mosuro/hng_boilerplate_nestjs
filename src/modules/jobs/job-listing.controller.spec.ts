import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './job-listing.controller';
import { JobsService } from './job-listing.service';
import { AuthGuard } from '../../modules/auth/auth.guard';
import { CreateJobListingDto } from './create-job-listing.dto';
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: {
            createJobListing: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<JobsController>(JobsController);
    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createJobListing', () => {
    it('should create a job listing', async () => {
      const createJobListingDto: CreateJobListingDto = {
        title: 'Test Job',
        description: 'Job Description',
        location: 'Location',
        salary: 'Salary',
        job_type: 'Full-time',
        company_name: 'Company',
      };
      const result = {
        message: 'Job listing created successfully',
        status_code: 201,
        data: createJobListingDto,
      };

      jest.spyOn(service, 'createJobListing').mockResolvedValue(result as never);

      expect(await controller.createJobListing(createJobListingDto, { user: { id: 'user-id' } })).toEqual(result);
    });

    it('should throw an error if the request data is invalid', async () => {
      const createJobListingDto: CreateJobListingDto = {
        title: '',
        description: 'Job Description',
        location: 'Location',
        salary: 'Salary',
        job_type: 'Full-time',
        company_name: 'Company',
      };
    });
  });
});
