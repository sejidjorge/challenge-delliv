import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OrderReturnDto } from 'src/dto/order.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class UpdateOrderService {
  constructor(private readonly jwtService: JwtService) {}
  async updateStatus(request: Request): Promise<OrderReturnDto> {
    const {
      params: { id },
      body,
    } = request;

    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    try {
      const viewOrder = await prisma.orders.findUnique({
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

      if (!viewOrder) {
        throw new HttpException(
          {
            message: 'Order not found',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        viewOrder.user.id !== tokenDecoded.id &&
        tokenDecoded.role !== 'ADMIN'
      ) {
        throw new HttpException(
          {
            message: 'You cannot edit orders for other users',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        viewOrder.status === 'RETURNED' ||
        (viewOrder.status === 'CANCELED' && tokenDecoded.role !== 'ADMIN')
      ) {
        throw new HttpException(
          {
            message: 'You cannot edit canceled or returned orders',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const order = await prisma.orders.update({
        where: {
          id,
        },
        data: {
          status: body.status,
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
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
