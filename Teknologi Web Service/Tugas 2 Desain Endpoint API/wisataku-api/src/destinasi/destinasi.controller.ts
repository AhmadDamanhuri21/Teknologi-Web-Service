import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua destinasi wisata' })
  @ApiResponse({
    status: 200,
    description: 'Daftar destinasi berhasil diambil',
  })
  getAllDestinasi() {
    return [
      {
        id: 1,
        nama: 'Pantai Kuta Mandalika',
        kategori: 'Pantai',
        hargaTiket: 10000,
      },
    ];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail destinasi berdasarkan ID' })
  @ApiResponse({
    status: 200,
    description: 'Detail destinasi berhasil diambil',
  })
  @ApiResponse({
    status: 404,
    description: 'Destinasi tidak ditemukan',
  })
  getDestinasiById(@Param('id') id: string) {
    return {
      id: Number(id),
      nama: 'Pantai Kuta Mandalika',
      kategori: 'Pantai',
      hargaTiket: 10000,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Menambahkan destinasi wisata baru' })
  @ApiResponse({
    status: 201,
    description: 'Destinasi berhasil ditambahkan',
  })
  @ApiResponse({
    status: 400,
    description: 'Data yang dikirim tidak valid',
  })
  createDestinasi(@Body() createDestinasiDto: CreateDestinasiDto) {
    return {
      message: 'Destinasi berhasil ditambahkan',
      data: createDestinasiDto,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui data destinasi berdasarkan ID' })
  @ApiResponse({
    status: 200,
    description: 'Destinasi berhasil diperbarui',
  })
  @ApiResponse({
    status: 404,
    description: 'Destinasi tidak ditemukan',
  })
  updateDestinasi(
    @Param('id') id: string,
    @Body() updateDestinasiDto: UpdateDestinasiDto,
  ) {
    return {
      message: `Destinasi dengan id ${id} berhasil diperbarui`,
      data: updateDestinasiDto,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus destinasi berdasarkan ID' })
  @ApiResponse({
    status: 200,
    description: 'Destinasi berhasil dihapus',
  })
  @ApiResponse({
    status: 404,
    description: 'Destinasi tidak ditemukan',
  })
  deleteDestinasi(@Param('id') id: string) {
    return {
      message: `Destinasi dengan id ${id} berhasil dihapus`,
    };
  }

  @Get(':id/ulasan')
  @ApiOperation({ summary: 'Mendapatkan ulasan berdasarkan ID destinasi' })
  @ApiResponse({
    status: 200,
    description: 'Daftar ulasan destinasi berhasil diambil',
  })
  @ApiResponse({
    status: 404,
    description: 'Destinasi tidak ditemukan',
  })
  getUlasanDestinasi(@Param('id') id: string) {
    return [
      {
        id: 1,
        destinasiId: Number(id),
        namaPengguna: 'Ahmad',
        rating: 5,
        komentar: 'Destinasi sangat bagus dan nyaman untuk dikunjungi.',
      },
    ];
  }
}