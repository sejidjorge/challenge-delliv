import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import prisma from '../../utils/prisma';

@Injectable()
export class DeleteUserService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(request: Request): Promise<void> {
    const { id } = request.params;
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (tokenDecoded.id !== id && tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: "You cannot delete another user's data",
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      await prisma.users.delete({
        where: {
          id,
        },
      });
    } catch (error) {
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
