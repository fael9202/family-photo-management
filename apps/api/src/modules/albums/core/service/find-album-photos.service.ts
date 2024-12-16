import { EventEmitter2 } from '@nestjs/event-emitter';
import { PhotosEvent } from '../../../../shared/utils/enums/events.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
import { AlbumRepository } from '../../persistence/albums.repository';
import { AlbumsQueryDto } from '../dto/albums.query.dto';

export interface AlbumPhotos {
  photos: Photo[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  album?: {
    id: number;
    title: string;
    user: {
      username: string;
      email: string;
    };
  };
}

@Injectable()
export class FindAlbumPhotosService {
  constructor(
    private eventEmitter: EventEmitter2,
    private albumRepository: AlbumRepository,
  ) {}

  async execute(albumId: string, query: AlbumsQueryDto): Promise<AlbumPhotos> {
    const album = await this.albumRepository.findAlbumById(Number(albumId));

    if (!album) {
      throw new HttpException(
        { status: false, message: 'Usuário não encontrado.' },
        HttpStatus.NOT_FOUND,
      );
    }

    const [albumPhotos]: AlbumPhotos[] = await this.eventEmitter.emitAsync(
      PhotosEvent.findPhotosByAlbumId,
      albumId,
      query,
    );

    return {
      ...albumPhotos,
      album,
    };
  }
}
