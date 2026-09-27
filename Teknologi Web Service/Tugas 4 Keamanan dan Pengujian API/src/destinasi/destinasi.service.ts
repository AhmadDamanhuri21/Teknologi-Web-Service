import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';

@Injectable()
export class DestinasiService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.destinasi.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const destinasi = await this.prisma.destinasi.findUnique({
      where: {
        id,
      },
    });

    if (!destinasi) {
      throw new NotFoundException(
        `Destinasi dengan id ${id} tidak ditemukan`,
      );
    }

    return destinasi;
  }

  async create(createDestinasiDto: CreateDestinasiDto) {
    return this.prisma.destinasi.create({
      data: {
        nama: createDestinasiDto.nama,
        kategori: createDestinasiDto.kategori,
        hargaTiket: createDestinasiDto.hargaTiket,
        lokasi: 'Belum diisi',
        deskripsi: 'Belum diisi',
        ratingRata: 0,
      },
    });
  }

  async update(
    id: number,
    updateDestinasiDto: UpdateDestinasiDto,
  ) {
    await this.findOne(id);

    return this.prisma.destinasi.update({
      where: {
        id,
      },
      data: updateDestinasiDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.destinasi.delete({
      where: {
        id,
      },
    });
  }
}
