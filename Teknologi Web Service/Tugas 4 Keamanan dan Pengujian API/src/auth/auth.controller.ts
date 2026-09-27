import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrasi pengguna baru',
  })
  @ApiResponse({
    status: 201,
    description: 'Registrasi berhasil',
  })
  @ApiResponse({
    status: 409,
    description: 'Email sudah terdaftar',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.nama,
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login pengguna',
  })
  @ApiResponse({
    status: 200,
    description: 'Login berhasil dan mendapatkan JWT',
  })
  @ApiResponse({
    status: 401,
    description: 'Email atau password salah',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.email,
      loginDto.password,
    );
  }
}