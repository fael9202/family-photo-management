import { Injectable } from '@nestjs/common';
import { AlbumRepository } from '../../persistence/albums.repository';
import { Album } from '@prisma/client';
import { AlbumsQueryDto } from '../dto/albums.query.dto';

@Injectable()
export class GetAllAlbumsService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(query: AlbumsQueryDto): Promise<{
    albums: Album[];
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }> {
    const { page, pageSize } = query;
    const albums = await this.albumRepository.getAllAlbums(
      Number(page),
      Number(pageSize),
    );
    const albumsCount = await this.albumRepository.getAllAlbumsCount();

    const totalPages = Math.ceil(albumsCount / Number(pageSize));
    const currentPage = Number(page);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return {
      albums,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
    };
  }
}
