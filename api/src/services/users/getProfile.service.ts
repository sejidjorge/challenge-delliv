import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { returnDataDto } from '../../dto/user.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class GetProfileService {
  constructor(private readonly jwtService: JwtService) {}

  async getProfile(request: Request): Promise<returnDataDto> {
    const { id } = request.params;
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (id !== tokenDecoded.id && tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: "You cannot access other users' data",
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          address: true,
        },
      });
      if (!user) {
        throw new Error('Error getting user data');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
