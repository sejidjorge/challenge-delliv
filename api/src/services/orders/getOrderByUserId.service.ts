import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OrderReturnDto } from 'src/dto/order.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class GetOrderByUserIdService {
  constructor(private readonly jwtService: JwtService) {}
  async getOrderUserById(request: Request): Promise<OrderReturnDto[]> {
    const { userId } = request.params;
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: 'You cannot view orders for other users',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const orders = await prisma.orders.findMany({
        where: {
          userId,
        },
        include: {
          user: {
            select: {
              name: true,
              address: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return orders;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
