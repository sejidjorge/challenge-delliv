import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto, returnDataDto } from '../../dto/user.dto';
import prisma from '../../utils/prisma';

const errors = ['User not found', 'Invalid password'];

@Injectable()
export default class UsersLoginService {
  async userLogin(loginDto: LoginDto): Promise<{ user: returnDataDto }> {
    try {
      const required = ['email', 'password'];
      for (const field of required) {
        if (!loginDto[field]) {
          throw new Error(`${field} is required`);
        }
      }
      try {
        const user = await prisma.users.findUnique({
          where: {
            email: loginDto.email,
          },
          select: {
            id: true,
            passwordHash: true,
          },
        });
        if (!user) {
          throw new Error(errors[0]);
        } else {
          const validatePassword = await bcrypt.compare(
            loginDto.password,
            user.passwordHash,
          );
          if (!validatePassword) {
            throw new Error(errors[1]);
          } else {
            const getAllData = await prisma.users.findUnique({
              where: {
                email: loginDto.email,
              },
              select: {
                id: true,
                email: true,
                name: true,
                address: true,
                role: true,
                createdAt: true,
                updatedAt: true,
              },
            });

            return { user: getAllData };
          }
        }
      } catch (error) {
        throw new HttpException(
          {
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
