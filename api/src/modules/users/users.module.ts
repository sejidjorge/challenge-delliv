import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from '../../controllers/users/users.controller';
import { UsersRegiserService } from '../../services/users/register.service';
import { UsersLoginService } from '../../services/users/login.service';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, JwtModule.register({ secret: process.env.PRIVATE_KEY })],
  controllers: [UsersController],
  providers: [UsersRegiserService, UsersLoginService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users/profile', method: RequestMethod.GET });
  }
}
