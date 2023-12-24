import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import AppController from 'src/controllers/app.controller';
import AppService from 'src/services/app.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
