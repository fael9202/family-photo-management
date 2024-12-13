import { Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
import { DatabaseService } from 'src/shared/config/database';

@Injectable()
export class PhotoRepository {
  constructor(private databaseService: DatabaseService) {}

  async getAlbumPhotos(
    albumId: number,
    page: number,
    pageSize: number,
  ): Promise<Photo[]> {
    return this.databaseService.photo.findMany({
      where: {
        albumId: Number(albumId),
      },
      skip: (Number(page) - 1) * Number(pageSize),
      take: pageSize,
    });
  }

  async getAlbumPhotosCount(albumId: number): Promise<number> {
    return this.databaseService.photo.count({
      where: {
        albumId: Number(albumId),
      },
    });
  }
}
