import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { DatabaseService } from '../../../shared/config/database';
import { UpdateAlbumDto } from '../core/dto/update-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(private databaseService: DatabaseService) {}
  // como posso incluir o user na tipagem do retorno do album?
  async getAllAlbums(
    page: number,
    pageSize: number,
  ): Promise<
    (Album & {
      user: {
        username: string;
        email: string;
        id: number;
      };
    })[]
  > {
    return this.databaseService.album.findMany({
      where: {},
      skip: (Number(page) - 1) * Number(pageSize),
      take: pageSize,
      include: {
        user: {
          select: {
            username: true,
            email: true,
            id: true,
          },
        },
      },
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
      id: number;
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
            id: true,
          },
        },
      },
    });
  }

  async findByTitle(title: string): Promise<Album | null> {
    // O certo seria usar o findUnique, porem como a api do jsonplaceholder pode retornar mais de um album com o mesmo titulo, usei o findFirst
    return this.databaseService.album.findFirst({
      where: { title },
    });
  }

  async create({
    title,
    userId,
  }: {
    title: string;
    userId: number;
  }): Promise<Album> {
    return this.databaseService.album.create({
      data: {
        title,
        userId: Number(userId),
      },
    });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.databaseService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async delete(id: number): Promise<Album> {
    return this.databaseService.album.delete({
      where: { id },
    });
  }
}
