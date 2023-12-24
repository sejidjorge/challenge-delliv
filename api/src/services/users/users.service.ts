import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/dto/createUser.dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, address, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prisma.user.create({
      data: {
        name,
        email,
        address,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
