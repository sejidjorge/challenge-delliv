import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { returnDataDto } from '../../dto/user.dto';
import prisma from '../../utils/prisma';

@Injectable()
export default class GetAllProfilesService {
  constructor(private readonly jwtService: JwtService) {}

  async getAllProfiles(request: Request): Promise<returnDataDto[]> {
    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: "You cannot access other users' data",
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const users = await prisma.users.findMany({
        orderBy: {
          createdAt: 'desc',
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
      return users;
    } catch (error) {
      console.log('error aaaaaaaaaaaaaaaaaaa', error);

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
