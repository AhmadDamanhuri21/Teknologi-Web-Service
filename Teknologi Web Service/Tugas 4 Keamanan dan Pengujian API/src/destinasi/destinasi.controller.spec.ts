import { Test, TestingModule } from '@nestjs/testing';

import { DestinasiController } from './destinasi.controller';
import { DestinasiService } from './destinasi.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('DestinasiController', () => {
  let controller: DestinasiController;

  const destinasiServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const jwtAuthGuardMock = {
    canActivate: jest.fn(() => true),
  };

  const rolesGuardMock = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [DestinasiController],
        providers: [
          {
            provide: DestinasiService,
            useValue: destinasiServiceMock,
          },
        ],
      })
        .overrideGuard(JwtAuthGuard)
        .useValue(jwtAuthGuardMock)
        .overrideGuard(RolesGuard)
        .useValue(rolesGuardMock)
        .compile();

    controller =
      module.get<DestinasiController>(DestinasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});