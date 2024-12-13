import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  albumId: number;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string;
}
