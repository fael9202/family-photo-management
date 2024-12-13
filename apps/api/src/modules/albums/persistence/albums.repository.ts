import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { DatabaseService } from 'src/shared/config/database';

@Injectable()
export class AlbumRepository {
  constructor(private databaseService: DatabaseService) {}

  async getAllAlbums(page: number, pageSize: number): Promise<Album[]> {
    return this.databaseService.album.findMany({
      where: {},
      skip: (Number(page) - 1) * Number(pageSize),
      take: pageSize,
    });
  }

  async getAllAlbumsCount(): Promise<number> {
    return this.databaseService.album.count();
  }
}
