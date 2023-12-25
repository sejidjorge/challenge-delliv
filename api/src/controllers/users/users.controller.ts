import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../../dto/user.dto';
import { UsersRegiserService } from '../../services/users/register.service';
import { UsersLoginService } from '../../services/users/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { request } from 'http';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersRegiserService: UsersRegiserService,
    private readonly usersLoginService: UsersLoginService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersRegiserService.createUser(createUserDto);
    return {
      message: 'User created successfully',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { user } = await this.usersLoginService.userLogin(loginDto);
    const token = await this.authService.generateToken(user);
    return { data: { user, token } };
  }

  @Get('profile')
  async profile() {
    return {
      message: `Olá, você está autenticado!`,
    };
  }
}
