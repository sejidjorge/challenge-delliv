import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { returnDataDto } from 'src/dto/user.dto';
import prisma from 'src/utils/prisma';

@Injectable()
export default class UpdateProfileService {
  constructor(private readonly jwtService: JwtService) {}

  async updateUser(request: Request): Promise<returnDataDto> {
    const {
      params: { id },
      body,
    } = request;
    const updatedBody = { ...body };
    delete updatedBody.id;

    const token = request.headers['authorization'];
    const tokenDecoded = await this.jwtService.verify(token);

    if (tokenDecoded.id !== id && tokenDecoded.role !== 'ADMIN') {
      throw new HttpException(
        {
          message: "You cannot edit other users' data",
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const update = await prisma.users.update({
        where: {
          id,
        },
        data: { ...updatedBody, updatedAt: new Date() },
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
      return update;
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
