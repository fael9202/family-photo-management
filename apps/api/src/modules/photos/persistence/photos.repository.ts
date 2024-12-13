import { Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
import { DatabaseService } from 'src/shared/config/database';
import { CreatePhotoDto } from '../core/dto/create-photo.dto';
import { UpdatePhotoDto } from '../core/dto/update-photo.dto';

@Injectable()
export class PhotoRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.databaseService.photo.create({
      data: createPhotoDto,
    });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    return this.databaseService.photo.update({
      where: { id },
      data: updatePhotoDto,
    });
  }

  async findById(id: number) {
    return this.databaseService.photo.findUnique({
      where: { id },
      include: {
        album: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Photo> {
    return this.databaseService.photo.delete({
      where: { id },
    });
  }

  async findByTitle(title: string): Promise<Photo | null> {
    return this.databaseService.photo.findFirst({
      where: {
        title,
      },
    });
  }

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
