import { Module } from '@nestjs/common';
import { AppService } from 'src/services';
import { AppController } from '../controllers';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
