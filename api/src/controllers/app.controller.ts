import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/services';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
