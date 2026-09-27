import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { DestinasiService } from './destinasi.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
  constructor(
    private readonly destinasiService: DestinasiService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Mendapatkan semua destinasi wisata',
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar destinasi berhasil diambil',
  })
  getAllDestinasi() {
    return this.destinasiService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Mendapatkan destinasi berdasarkan ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Data destinasi berhasil diambil',
  })
  @ApiResponse({
    status: 404,
    description: 'Destinasi tidak ditemukan',
  })
  getDestinasiById(@Param('id') id: string) {
    return this.destinasiService.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Menambahkan destinasi wisata',
  })
  @ApiResponse({
    status: 201,
    description: 'Destinasi berhasil ditambahkan',
  })
  @ApiResponse({
    status: 401,
    description: 'Token JWT tidak valid atau belum login',
  })
  @ApiResponse({
    status: 403,
    description: 'Hanya admin yang dapat menambahkan destinasi',
  })
  createDestinasi(
    @Body() createDestinasiDto: CreateDestinasiDto,
  ) {
    return this.destinasiService.create(
      createDestinasiDto,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Memperbarui destinasi wisata',
  })
  @ApiResponse({
    status: 200,
    description: 'Destinasi berhasil diperbarui',
  })
  @ApiResponse({
    status: 401,
    description: 'Token JWT tidak valid atau belum login',
  })
  @ApiResponse({
    status: 403,
    description: 'Hanya admin yang dapat memperbarui destinasi',
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Menghapus destinasi wisata',
  })
  @ApiResponse({
    status: 200,
    description: 'Destinasi berhasil dihapus',
  })
  @ApiResponse({
    status: 401,
    description: 'Token JWT tidak valid atau belum login',
  })
  @ApiResponse({
    status: 403,
    description: 'Hanya admin yang dapat menghapus destinasi',
  })
  @ApiResponse({
    status: 404,
    description: 'Destinasi tidak ditemukan',
  })
  deleteDestinasi(@Param('id') id: string) {
    return this.destinasiService.remove(Number(id));
  }

  @Get(':id/ulasan')
  @ApiOperation({
    summary: 'Mendapatkan ulasan destinasi',
  })
  @ApiResponse({
    status: 200,
    description: 'Data ulasan berhasil diambil',
  })
  getUlasan(@Param('id') id: string) {
    return {
      destinasiId: Number(id),
      ulasan: [
        {
          nama: 'Ahmad',
          rating: 5,
          komentar: 'Destinasi sangat bagus dan menarik.',
        },
      ],
    };
  }
}