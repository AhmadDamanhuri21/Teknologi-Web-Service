import { PartialType } from '@nestjs/swagger';
import { CreateDestinasiDto } from './create-destinasi.dto';

export class UpdateDestinasiDto extends PartialType(CreateDestinasiDto) {}