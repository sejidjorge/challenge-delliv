import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OrderReturnDto } from 'src/dto/order.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class GetAllOrdersService {
  constructor(private readonly jwtService: JwtService) {}
  async execute(request: Request): Promise<OrderReturnDto[]> {
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: 'You cannot view orders for other users',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const orders = await prisma.orders.findMany({
        orderBy: {
          createdAt: 'desc',
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
      });
      return orders;
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
