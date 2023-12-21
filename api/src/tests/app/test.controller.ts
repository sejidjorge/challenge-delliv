import { Controller, Get } from '@nestjs/common';

@Controller('test')
export default class TestController {
  @Get()
  findAll(): string {
    return 'test';
  }
}
