import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from '@/dto/createUser.dto';
import { UsersService } from '@/services/users/users.service';
import { validateRegister } from '@/utils/validateRegister';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await validateRegister(createUserDto);
      try {
        await this.usersService.createUser(createUserDto);
        return {
          message: 'User created successfully',
        };
      } catch (error) {
        if (error.meta.target.filter((item) => item === 'email').length !== 0) {
          throw new HttpException(
            {
              message: 'User email already exists',
              statusCode: HttpStatus.CONFLICT,
            },
            HttpStatus.CONFLICT,
          );
        } else {
          throw new HttpException(
            {
              message: 'Error creating user',
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
