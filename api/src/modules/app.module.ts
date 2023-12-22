import { Module } from '@nestjs/common';
import { AppController, TestController } from '../controllers';
import { AppService } from 'src/services';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export default class AppModule {}
