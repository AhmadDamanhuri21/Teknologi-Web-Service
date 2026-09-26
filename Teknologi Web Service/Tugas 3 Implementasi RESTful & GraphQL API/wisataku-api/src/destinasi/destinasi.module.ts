import { Module } from '@nestjs/common';
import { DestinasiController } from './destinasi.controller';
import { DestinasiService } from './destinasi.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DestinasiController],
  providers: [DestinasiService],
})
export class DestinasiModule {}