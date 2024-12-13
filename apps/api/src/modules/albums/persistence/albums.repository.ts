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

  async findAlbumsByUserId(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Album[]> {
    return this.databaseService.album.findMany({
      where: {
        userId: Number(userId),
      },
      skip: (Number(page) - 1) * Number(pageSize),
      take: pageSize,
    });
  }

  async findAlbumsByUserIdCount(userId: number): Promise<number> {
    return this.databaseService.album.count({
      where: {
        userId: Number(userId),
      },
    });
  }

  async findAlbumById(albumId: number): Promise<{
    id: number;
    title: string;
    user: {
      username: string;
      email: string;
    };
  } | null> {
    return this.databaseService.album.findUnique({
      where: {
        id: Number(albumId),
      },
      select: {
        id: true,
        title: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
  }
}
