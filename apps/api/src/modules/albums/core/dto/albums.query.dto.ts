import { IsOptional } from 'class-validator';

export class AlbumsQueryDto {
  @IsOptional()
  page: string = '1';

  @IsOptional()
  pageSize: string = '10';
}
