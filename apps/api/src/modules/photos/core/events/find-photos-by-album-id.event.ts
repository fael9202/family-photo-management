import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PhotosEvent } from '../../../../shared/utils/enums/events.enum';
import { PhotoRepository } from '../../persistence/photos.repository';
import { AlbumPhotos } from '../../../albums/core/service/find-album-photos.service';
import { AlbumsQueryDto } from '../../../albums/core/dto/albums.query.dto';

@Injectable()
export class FindPhotosByAlbumIdService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  @OnEvent(PhotosEvent.findPhotosByAlbumId)
  async findPhotosByAlbumId(
    albumId: number,
    query: AlbumsQueryDto,
  ): Promise<AlbumPhotos> {
    const { page, pageSize } = query;
    const photos = await this.photoRepository.getAlbumPhotos(
      albumId,
      Number(page),
      Number(pageSize),
    );
    const photosCount = await this.photoRepository.getAlbumPhotosCount(albumId);

    const totalPages = Math.ceil(photosCount / Number(pageSize));
    const currentPage = Number(page);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return {
      photos,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
    };
  }
}
