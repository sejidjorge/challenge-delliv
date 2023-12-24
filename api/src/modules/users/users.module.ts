import { Module } from '@nestjs/common';
import { UsersController } from '../../controllers/users/users.controller';
import { UsersRegiserService } from '../../services/users/register.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersRegiserService],
})
export class UsersModule {}
