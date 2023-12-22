import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UsersService } from 'src/services';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return {
      message: 'Usuario criado com sucesso',
    };
  }
}
