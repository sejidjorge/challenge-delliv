import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import prisma from '../../utils/prisma';

@Injectable()
export default class UpdatePasswordService {
  constructor(private readonly jwtService: JwtService) {}

  async updateUserPassword(request: Request): Promise<void> {
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);
    const {
      params: { id },
      body,
    } = request;

    if (tokenDecoded.id !== id) {
      throw new HttpException(
        'Unauthorized to edit other users password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const user = await prisma.users.findUnique({
        where: { id },
        select: { id: true, passwordHash: true },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const passwordsMatch = await bcrypt.compare(
        body.oldPassword,
        user.passwordHash,
      );
      if (!passwordsMatch) {
        throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(body.newPassword, 10);
      await prisma.users.update({
        where: { id },
        data: { passwordHash: hashedPassword, updatedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
