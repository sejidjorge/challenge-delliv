import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { UsersRegiserService } from '../../services/users/register.service';

describe('UsersService', () => {
  let service: UsersRegiserService;
  let prismaMock: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRegiserService,
        { provide: PrismaClient, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersRegiserService>(UsersRegiserService);
    prismaMock = module.get<PrismaClient>(PrismaClient);
  });

  it('should create a user successfully', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'test@example.com',
      address: '123 Main St',
      password: 'password',
    };

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      new HttpException(
        { message: 'User created successfully' },
        HttpStatus.CREATED,
      ),
    );
  });

  it('should throw an error if validation fails', async () => {
    const createUserDto = {
      name: 'John Doe',
      address: '123 Main St',
      password: 'password',
      email: null,
    };

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      new HttpException(
        { message: 'email is required' },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
