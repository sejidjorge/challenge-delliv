import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dto/createUser.dto';
import { UsersRegiserService } from '../../services/users/register.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRegiserService: UsersRegiserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersRegiserService.createUser(createUserDto);
    return {
      message: 'User created successfully',
    };
  }
}
