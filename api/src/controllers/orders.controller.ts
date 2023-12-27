import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  CreateOrderService,
  DeleteOrderService,
  GetAllOrdersService,
  GetOrderByIdService,
  GetOrderByUserIdService,
  UpdateOrderService,
} from '../services/orders';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getAllOrdersService: GetAllOrdersService,
    private readonly getOrderByIdService: GetOrderByIdService,
    private readonly getOrderByUserIdService: GetOrderByUserIdService,
    private readonly updatOrderService: UpdateOrderService,
    private readonly deleteOrderService: DeleteOrderService,
  ) {}

  @Post('new')
  async createOrder(@Req() request: Request) {
    const order = await this.createOrderService.create(request);
    return order;
  }
  @Get('all')
  async getAllOrders(@Req() request: Request) {
    const orders = await this.getAllOrdersService.execute(request);
    return orders;
  }

  @Get(':id')
  async getOrder(@Req() request: Request) {
    const order = await this.getOrderByIdService.getOrderById(request);
    return order;
  }

  @Put(':id')
  async updateOrder(@Req() request: Request) {
    const order = await this.updatOrderService.updateStatus(request);
    return order;
  }

  @Delete(':id')
  async deleteOrder(@Req() request: Request) {
    await this.deleteOrderService.deleteOrder(request);
    return {
      message: 'Order deleted successfully',
    };
  }

  @Get('user/:userId')
  async getOrdersByUserId(@Req() request: Request) {
    const orders = await this.getOrderByUserIdService.getOrderUserById(request);
    return orders;
  }
}
