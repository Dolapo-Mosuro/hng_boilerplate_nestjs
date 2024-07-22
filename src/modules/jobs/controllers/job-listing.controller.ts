import { Controller, Post, Body, UseGuards, BadRequestException, UnauthorizedException, Req } from '@nestjs/common';
import { JobsService } from '../services/job-listing.service';
import { CreateJobListingDto } from '../dtos/create-job-listing.dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('api/v1/jobs')
export class JobsController {
  [x: string]: any;
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createJob(@Body() createJobListingDto: CreateJobListingDto, @Req() request) {
    if (!request.user) {
      throw new UnauthorizedException({
        message: 'Unauthenticated',
        status_code: 401,
      });
    }
    try {
      return await this.jobListingService.createJobListing(createJobListingDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Invalid request data',
        status_code: 400,
      });
    }
  }
}
