import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'ahmad@gmail.com',
    description: 'Email pengguna',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password pengguna',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}