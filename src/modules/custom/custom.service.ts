import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomService {
  getHello(): string {
    return 'Hello from CustomService!';
  }
}
