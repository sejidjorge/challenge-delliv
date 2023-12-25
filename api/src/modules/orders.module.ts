import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrdersController } from '../controllers/orders.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import {
  CreateOrderService,
  DeleteOrderService,
  GetAllOrdersService,
  GetOrderByIdService,
  GetOrderByUserIdService,
  UpdateOrderService,
} from '../services/orders';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({ secret: process.env.PRIVATE_KEY }),
  ],
  controllers: [OrdersController],
  providers: [
    CreateOrderService,
    GetAllOrdersService,
    GetOrderByIdService,
    GetOrderByUserIdService,
    UpdateOrderService,
    DeleteOrderService,
  ],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(OrdersController);
  }
}
