import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../controllers/users.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import {
  DeleteUserService,
  GetAllProfilesService,
  GetProfileService,
  UpdateProfileService,
  UsersLoginService,
  UsersRegiserService,
} from '../services/users';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({ secret: process.env.PRIVATE_KEY }),
  ],
  controllers: [UsersController],
  providers: [
    UsersRegiserService,
    UsersLoginService,
    GetProfileService,
    UpdateProfileService,
    DeleteUserService,
    GetAllProfilesService,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'users/login', method: RequestMethod.POST },
      )
      .forRoutes('users/profile/(*)', {
        path: 'users/all',
        method: RequestMethod.GET,
      });
  }
}
