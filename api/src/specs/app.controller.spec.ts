import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "App is running!"', () => {
      expect(appController.getHello()).toBe('App is running!');
    });
  });
});
