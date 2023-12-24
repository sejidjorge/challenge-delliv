import { Module } from '@nestjs/common';
import UsersController from 'src/controllers/users/users.controller';
import UsersService from 'src/services/users/users.service';


@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}