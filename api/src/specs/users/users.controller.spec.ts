import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { UsersRegisterController } from '../../controllers/users/register.controller';
import { UsersRegisterService } from '../../services/users/register.service';
import { PrismaClient } from '@prisma/client';

describe('UsersRegisterController', () => {
  let app: INestApplication;
  let controller: UsersRegisterController;
  let service: UsersRegisterService;
  let prismaService: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRegisterController],
      providers: [UsersRegisterService, PrismaClient],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = app.get<UsersRegisterController>(UsersRegisterController);
    service = app.get<UsersRegisterService>(UsersRegisterService);
    prismaService = app.get<PrismaClient>(PrismaClient);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        address: 'Test Address',
        password: 'testpassword',
      };

      jest.spyOn(service, 'createUser').mockResolvedValueOnce();

      const result = await controller.create(createUserDto);

      expect(result).toEqual({ message: 'User created successfully' });
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle validation errors', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: null,
        address: 'Test Address',
        password: 'testpassword',
      };
      await expect(controller.create(createUserDto)).rejects.toThrow(
        new HttpException(
          { message: 'name is required' },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should handle duplicate email errors', async () => {
      const createUserDto = {
        email: 'existing@example.com',
        name: 'Test User',
        address: 'Test Address',
        password: 'testpassword',
      };

      jest.spyOn(service, 'createUser').mockRejectedValueOnce({
        meta: { target: ['email'] },
      });

      await expect(controller.create(createUserDto)).rejects.toThrow(
        new HttpException(
          { message: 'User email already exists' },
          HttpStatus.CONFLICT,
        ),
      );
    });
  });
});
