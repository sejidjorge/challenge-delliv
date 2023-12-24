import { Module } from '@nestjs/common';
import { UsersRegisterController } from '../../controllers/users/register.controller';
import { UsersRegisterService } from '../../services/users/register.service';

@Module({
  imports: [],
  controllers: [UsersRegisterController],
  providers: [UsersRegisterService],
})
export class UsersModule {}
