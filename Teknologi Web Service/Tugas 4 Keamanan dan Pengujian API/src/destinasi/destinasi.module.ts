import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DestinasiController } from './destinasi.controller';
import { DestinasiService } from './destinasi.service';
import { PrismaModule } from '../prisma/prisma.module';

import { DestinasiResolver } from '../graphql/destinasi.resolver';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [DestinasiController],
  providers: [
    DestinasiService,
    DestinasiResolver,
  ],
})
export class DestinasiModule {}