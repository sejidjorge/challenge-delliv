import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import prisma from '../../utils/prisma';

@Injectable()
export default class DeleteUserService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(request: Request): Promise<void> {
    const { id } = request.params;
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (tokenDecoded.id !== id && tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: "You cannot delete another user's data",
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await prisma.users.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error.message ===
        '\nInvalid `prisma.users.delete()` invocation in\nC:\\Users\\sejid\\Desenvolvimento\\Pessoal\\challenge-delliv\\api\\src\\services\\users\\deleteUser.service.ts:26:32\n\n  23 }\n  24 \n  25 try {\n→ 26   await prisma.users.delete(\nForeign key constraint failed on the field: `Orders_userId_fkey (index)`'
      ) {
        throw new HttpException(
          {
            message: 'Profiles with orders cannot be deleted',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        {
          message: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
