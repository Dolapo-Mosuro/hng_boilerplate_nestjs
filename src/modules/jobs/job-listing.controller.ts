import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JobsService } from './job-listing.service';
import { CreateJobListingDto } from './create-job-listing.dto';
import { AuthGuard } from '../auth/auth.guard';
import { req } from 'pino-std-serializers';

@Controller('api/v1/jobs')
export class JobsController {
  [x: string]: any;
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createJob(@Body() createJobListingDto: CreateJobListingDto) {
    try {
      if (!req['user']) {
        throw new UnauthorizedException({
          message: 'Unauthenticated',
          status_code: 401,
        });
      }
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
