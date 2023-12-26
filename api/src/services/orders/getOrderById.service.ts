import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OrderReturnDto } from 'src/dto/order.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class GetOrderByIdService {
  constructor(private readonly jwtService: JwtService) {}
  async getOrderById(request: Request): Promise<OrderReturnDto> {
    const { id } = request.params;
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
      const order = await prisma.orders.findUnique({
        where: {
          id,
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
      return order;
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
