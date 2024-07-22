import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobListingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  salary: string;

  @IsNotEmpty()
  @IsString()
  job_type: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;
}
