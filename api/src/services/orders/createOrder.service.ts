import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OrderReturnDto } from '../../dto/order.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class CreateOrderService {
  constructor(private readonly jwtService: JwtService) {}
  async create(request: Request): Promise<OrderReturnDto> {
    const body = request.body;
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (body.userId !== tokenDecoded.id && tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: 'You cannot create orders for other users',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const order = await prisma.orders.create({
        data: { ...body },
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
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
