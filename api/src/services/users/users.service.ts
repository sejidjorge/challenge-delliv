import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Injectable()
export default class UsersService {
  private prisma = new PrismaClient();

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        passwordHash: hashedPassword,
      },
      select: {
        // Select only necessary fields for response
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
