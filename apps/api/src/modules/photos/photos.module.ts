import { Module } from '@nestjs/common';
import { PhotosController } from './http/photos.controller';
import { PhotosService } from './core/services/photos.service';
import { FindPhotosByAlbumIdService } from './core/events/find-photos-by-album-id.event';
import { PhotoRepository } from './persistence/photos.repository';
import { RemovePhotoService } from './core/services/remove-photo.service';
import { UpdatePhotoService } from './core/services/update-photo.service';
import { CreatePhotoService } from './core/services/create-photo.service';

@Module({
  controllers: [PhotosController],
  providers: [
    PhotosService,
    FindPhotosByAlbumIdService,
    PhotoRepository,
    CreatePhotoService,
    UpdatePhotoService,
    RemovePhotoService,
  ],
})
export class PhotosModule {}
