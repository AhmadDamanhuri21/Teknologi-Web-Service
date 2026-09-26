import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { DestinasiType } from './destinasi.type';
import { DestinasiService } from '../destinasi/destinasi.service';

@Resolver(() => DestinasiType)
export class DestinasiResolver {
  constructor(
    private readonly destinasiService: DestinasiService,
  ) {}

  @Query(() => [DestinasiType], {
    name: 'destinasi',
  })
  findAll() {
    return this.destinasiService.findAll();
  }

  @Query(() => DestinasiType, {
    name: 'destinasiById',
  })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.destinasiService.findOne(id);
  }
}