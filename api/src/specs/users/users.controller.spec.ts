import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { UsersController } from '../../controllers/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { PrismaClient } from '@prisma/client';
import { validateRegister } from 'src/utils/validateRegister';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let service: UsersService;
  let prismaService: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaClient],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = app.get<UsersController>(UsersController);
    service = app.get<UsersService>(UsersService);
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
