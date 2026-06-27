import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/user-type.enum';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      findByIdOrThrow: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto = {
      nome: 'Test',
      documento: '12345678900',
      email: 'test@example.com',
      senha: 'password',
      nascimento: new Date(),
      tipo: UserType.ESTUDANTE,
    };

    it('should hash password and save user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pass');
      repository.save.mockImplementation(async (user) => user as any);

      const result = await service.create({ ...createUserDto });

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 8);
      expect(repository.save).toHaveBeenCalled();
      expect(result.nome).toBe('Test');
    });

    it('should throw ConflictException on duplicate email', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pass');
      repository.save.mockRejectedValue({ code: '23505', detail: 'Key (email)=(test@example.com) already exists.' });

      await expect(service.create({ ...createUserDto })).rejects.toThrow(ConflictException);
      await expect(service.create({ ...createUserDto })).rejects.toThrow('Este e-mail já está cadastrado.');
    });
  });

  describe('getProfile', () => {
    it('should return a ViewUserDto', async () => {
      repository.findByIdOrThrow.mockResolvedValue({ id: '1', nome: 'Test', email: 'a@a.com', tipo: UserType.ESTUDANTE } as any);
      
      const result = await service.getProfile('1');
      expect(result.id).toBe('1');
      expect(repository.findByIdOrThrow).toHaveBeenCalledWith('1');
    });
  });
});
