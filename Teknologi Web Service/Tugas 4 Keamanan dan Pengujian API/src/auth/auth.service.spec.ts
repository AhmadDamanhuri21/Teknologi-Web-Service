import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const jwtMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: PrismaService,
            useValue: prismaMock,
          },
          {
            provide: JwtService,
            useValue: jwtMock,
          },
        ],
      }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue(
      'hashed-password',
    );

    prismaMock.user.create.mockResolvedValue({
      id: 1,
      nama: 'Ahmad',
      email: 'ahmad@gmail.com',
      password: 'hashed-password',
      role: 'wisatawan',
    });

    const result = await service.register(
      'Ahmad',
      'ahmad@gmail.com',
      'password123',
    );

    expect(bcrypt.hash).toHaveBeenCalledWith(
      'password123',
      10,
    );

    expect(prismaMock.user.create).toHaveBeenCalled();

    expect(result).toEqual({
      id: 1,
      nama: 'Ahmad',
      email: 'ahmad@gmail.com',
      role: 'wisatawan',
    });
  });

  it('should reject duplicate email', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'ahmad@gmail.com',
    });

    await expect(
      service.register(
        'Ahmad',
        'ahmad@gmail.com',
        'password123',
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('should login successfully and return JWT', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      nama: 'Ahmad',
      email: 'ahmad@gmail.com',
      password: 'hashed-password',
      role: 'admin',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    jwtMock.signAsync.mockResolvedValue('jwt-token');

    const result = await service.login(
      'ahmad@gmail.com',
      'password123',
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(
      'password123',
      'hashed-password',
    );

    expect(jwtMock.signAsync).toHaveBeenCalledWith({
      sub: 1,
      email: 'ahmad@gmail.com',
      role: 'admin',
    });

    expect(result).toEqual({
      access_token: 'jwt-token',
      user: {
        id: 1,
        nama: 'Ahmad',
        email: 'ahmad@gmail.com',
        role: 'admin',
      },
    });
  });

  it('should reject invalid password', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      nama: 'Ahmad',
      email: 'ahmad@gmail.com',
      password: 'hashed-password',
      role: 'admin',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login(
        'ahmad@gmail.com',
        'password-salah',
      ),
    ).rejects.toThrow(UnauthorizedException);
  });
});