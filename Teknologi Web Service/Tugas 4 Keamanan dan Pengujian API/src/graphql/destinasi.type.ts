import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DestinasiType {
  @Field(() => Int)
  id: number;

  @Field()
  nama: string;

  @Field()
  kategori: string;

  @Field()
  lokasi: string;

  @Field()
  deskripsi: string;

  @Field(() => Int)
  hargaTiket: number;

  @Field(() => Float)
  ratingRata: number;
}