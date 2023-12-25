import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto, LoginDto } from '../../dto/user.dto';
import { AuthService } from '../../services/auth/auth.service';
import { GetProfileService } from '../../services/users/getProfile.service';
import { UsersLoginService } from '../../services/users/login.service';
import { UsersRegiserService } from '../../services/users/register.service';
import { UpdateProfileService } from '../../services/users/updateProfile.service';
import { DeleteUserService } from '../../services/users/deleteUser.service';
import { GetAllProfilesService } from '../../services/users/getAllUsers.service';
import { count } from 'console';

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

  @Get(':id')
  async profile(@Req() request: Request) {
    const data = await this.getProfileService.getProfile(request);
    return data;
  }

  @Post(':id')
  async editProfile(@Req() request: Request) {
    const data = await this.updateProfileService.updateUser(request);
    return data;
  }

  @Delete(':id')
  async deleteProfile(@Req() request: Request) {
    await this.deleteProfileService.execute(request);
    return { message: 'User deleted successfully' };
  }

  @Get()
  async listAllUsers(@Req() request: Request) {
    const users = await this.getAllUsersService.getAllProfiles(request);
    return { data: users };
  }
}
