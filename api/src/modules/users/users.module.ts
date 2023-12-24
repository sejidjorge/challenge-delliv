import { UsersController } from '../../controllers/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
