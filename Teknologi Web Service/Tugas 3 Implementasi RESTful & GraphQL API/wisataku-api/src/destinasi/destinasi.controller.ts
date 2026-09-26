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
import { DestinasiService } from './destinasi.service';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
  constructor(private readonly destinasiService: DestinasiService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua destinasi wisata' })
  @ApiResponse({
    status: 200,
    description: 'Daftar destinasi berhasil diambil',
  })
  getAllDestinasi() {
    return this.destinasiService.findAll();
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
    return this.destinasiService.findOne(Number(id));
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
    return this.destinasiService.create(createDestinasiDto);
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
    return this.destinasiService.update(
      Number(id),
      updateDestinasiDto,
    );
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
    return this.destinasiService.remove(Number(id));
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