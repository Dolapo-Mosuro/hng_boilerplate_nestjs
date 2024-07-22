import { Controller, Get } from '@nestjs/common';
import { CustomService } from './custom.service';

@Controller('custom')
export class CustomController {
  constructor(private readonly customService: CustomService) {}

  @Get()
  getHello(): string {
    return this.customService.getHello();
  }
}
