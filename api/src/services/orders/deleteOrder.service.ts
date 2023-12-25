import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import prisma from '../../utils/prisma';

@Injectable()
export default class DeleteOrderService {
  constructor(private readonly jwtService: JwtService) {}
  async deleteOrder(request: Request): Promise<void> {
    const {
      params: { id, userId },
    } = request;

    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (userId !== tokenDecoded.id && tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: 'You cannot delete orders for other users',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      await prisma.orders.delete({
        where: {
          id,
        }
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
