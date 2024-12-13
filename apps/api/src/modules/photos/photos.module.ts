import { Module } from '@nestjs/common';
import { PhotosController } from './http/photos.controller';
import { PhotosService } from './core/services/photos.service';
import { FindPhotosByAlbumIdService } from './core/events/find-photos-by-album-id.event';
import { PhotoRepository } from './persistence/photos.repository';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, FindPhotosByAlbumIdService, PhotoRepository],
})
export class PhotosModule {}
