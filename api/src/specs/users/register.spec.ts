import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, Role } from '@prisma/client';
import { UsersRegiserService } from '../../services/users/register.service';
import { prismaMock } from '../../singleton';

describe('UsersService', () => {
  let service: UsersRegiserService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRegiserService,
        { provide: PrismaClient, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersRegiserService>(UsersRegiserService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should create a user successfully', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'test@example.com',
      address: '123 Main St',
      password: 'password',
    };

    const createUserResult: {
      id: string;
      name: string;
      email: string;
      address: string;
      role: Role;
      passwordHash: string;
      createdAt: Date;
      updatedAt: Date;
    } = {
      id: 'b08ffb4d-314a-4db4-97c6-69ab0f941958',
      name: 'John Doe',
      email: 'test@example.com',
      address: '123 Main St',
      role: Role.USER,
      passwordHash: 'string',
      createdAt: new Date('2023-12-24 15:32:57.059'),
      updatedAt: new Date('2023-12-24 15:32:57.059'),
    };
    prisma.user.create.mockResolvedValue(createUserResult);

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
