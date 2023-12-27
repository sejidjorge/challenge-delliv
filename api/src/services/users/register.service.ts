import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../dto/user.dto';
import prisma from '../../utils/prisma';
import { validateRegister } from '../../utils/validateRegister';

@Injectable()
export default class UsersRegiserService {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await validateRegister(createUserDto);
      try {
        const { name, email, address, password, role } = createUserDto;
        const required = ['email', 'name', 'address', 'password'];
        for (const field of required) {
          if (!createUserDto[field]) {
            throw new Error(`${field} is required`);
          }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.create({
          data: {
            name,
            email,
            address,
            role,
            passwordHash: hashedPassword,
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });
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
