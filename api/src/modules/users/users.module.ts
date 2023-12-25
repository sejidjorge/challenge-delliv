import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../../controllers/users/users.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { DeleteUserService } from '../../services/users/deleteUser.service';
import { GetAllProfilesService } from '../../services/users/getAllUsers.service';
import { GetProfileService } from '../../services/users/getProfile.service';
import { UsersLoginService } from '../../services/users/login.service';
import { UsersRegiserService } from '../../services/users/register.service';
import { UpdateProfileService } from '../../services/users/updateProfile.service';
import { AuthModule } from '../auth/auth.module';

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
        'users/(.*)',
      )
      .forRoutes(UsersController);
  }
}
