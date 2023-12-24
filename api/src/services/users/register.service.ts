import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { validateRegister } from '../../utils/validateRegister';
import { CreateUserDto } from '../../dto/createUser.dto';

@Injectable()
export class UsersRegiserService {
  private prisma = new PrismaClient();

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await validateRegister(createUserDto);
      try {
        const { name, email, address, password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.prisma.user
          .create({
            data: {
              name,
              email,
              address,
              passwordHash: hashedPassword,
            },
            select: {
              id: true,
              email: true,
              name: true,
            },
          })
          .then((user) => console.log(user));

        throw new HttpException(
          {
            message: 'User created successfully',
          },
          HttpStatus.CREATED,
        );
      } catch (error) {
        if (
          error?.meta?.target?.filter((item) => item === 'email').length !== 0
        ) {
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
