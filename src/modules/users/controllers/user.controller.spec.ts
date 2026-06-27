import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      getProfile: jest.fn(),
      getPublicProfile: jest.fn(),
      updateProfile: jest.fn(),
      updatePassword: jest.fn(),
      getSubscriptions: jest.fn(),
      updateSubscriptions: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should call service.getProfile', async () => {
      const mockResult = { id: '1', nome: 'Test' } as any;
      service.getProfile.mockResolvedValue(mockResult);

      const result = await controller.getProfile('1');

      expect(result).toEqual(mockResult);
      expect(service.getProfile).toHaveBeenCalledWith('1');
    });
  });
  
  describe('getPublicProfile', () => {
    it('should call service.getPublicProfile', async () => {
      const mockResult = { id: '2', nome: 'Public User' } as any;
      service.getPublicProfile.mockResolvedValue(mockResult);

      const result = await controller.getPublicProfile('2');

      expect(result).toEqual(mockResult);
      expect(service.getPublicProfile).toHaveBeenCalledWith('2');
    });
  });
});
