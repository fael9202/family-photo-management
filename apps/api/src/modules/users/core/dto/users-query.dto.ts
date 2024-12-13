import { IsOptional } from 'class-validator';

export class UsersQueryDto {
  @IsOptional()
  page: string = '1';

  @IsOptional()
  pageSize: string = '10';
}
