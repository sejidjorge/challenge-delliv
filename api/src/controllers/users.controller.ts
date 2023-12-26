import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto, LoginDto } from '../dto/user.dto';
import { AuthService } from '../services/auth/auth.service';
import {
  DeleteUserService,
  GetAllProfilesService,
  GetProfileService,
  UpdatePasswordService,
  UpdateProfileService,
  UsersLoginService,
  UsersRegiserService,
} from '../services/users';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersRegiserService: UsersRegiserService,
    private readonly usersLoginService: UsersLoginService,
    private readonly authService: AuthService,
    private readonly getProfileService: GetProfileService,
    private readonly updateProfileService: UpdateProfileService,
    private readonly deleteProfileService: DeleteUserService,
    private readonly getAllUsersService: GetAllProfilesService,
    private readonly updatePasswordService: UpdatePasswordService,
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

  @Get('profile/:id')
  async profile(@Req() request: Request) {
    const data = await this.getProfileService.getProfile(request);
    return data;
  }

  @Put('profile/:id')
  async editProfile(@Req() request: Request) {
    const data = await this.updateProfileService.updateUser(request);
    return data;
  }
  @Put('profile/:id/password')
  async editUserPassword(@Req() request: Request) {
    const data = await this.updatePasswordService.updateUserPassword(request);
    return data;
  }

  @Delete('profile/:id')
  async deleteProfile(@Req() request: Request) {
    await this.deleteProfileService.execute(request);
    return { message: 'User deleted successfully' };
  }

  @Get('all')
  async listAllUsers(@Req() request: Request) {
    const users = await this.getAllUsersService.getAllProfiles(request);
    return { data: users };
  }
}
