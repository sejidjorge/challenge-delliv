import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../services/auth/auth.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Module({
  imports: [JwtModule.register({ secret: process.env.PRIVATE_KEY })],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthService],
})
export class AuthModule {}
