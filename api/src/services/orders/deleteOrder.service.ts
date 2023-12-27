import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import prisma from '../../utils/prisma';

@Injectable()
export default class DeleteOrderService {
  constructor(private readonly jwtService: JwtService) {}
  async deleteOrder(request: Request): Promise<void> {
    const {
      params: { id },
    } = request;

    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    try {
      const order = await prisma.orders.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!order) {
        throw new HttpException(
          {
            message: 'Order not found',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (order.user.id !== tokenDecoded.id && tokenDecoded.role !== 'ADMIN') {
        throw new HttpException(
          {
            message: 'You cannot delete orders for other users',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await prisma.orders.delete({
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
