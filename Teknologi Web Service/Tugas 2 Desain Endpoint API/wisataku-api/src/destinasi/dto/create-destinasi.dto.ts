import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDestinasiDto {
  @ApiProperty({
    example: 'Pantai Tanjung Aan',
    description: 'Nama destinasi wisata',
  })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({
    example: 'Pantai',
    description: 'Kategori destinasi wisata',
  })
  @IsString()
  @IsNotEmpty()
  kategori: string;

  @ApiProperty({
    example: 15000,
    description: 'Harga tiket masuk dalam rupiah',
  })
  @IsNumber()
  @Min(0)
  hargaTiket: number;
}