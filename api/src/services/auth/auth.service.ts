import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { returnDataDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user: returnDataDto) {
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = await this.jwtService.sign(payload);
    return token;
  }
}
