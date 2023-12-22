import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers';
import { UsersService } from 'src/services';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
