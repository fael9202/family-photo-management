import { Module } from '@nestjs/common';
import { AlbumsController } from './http/albums.controller';
import { GetAllAlbumsService } from './core/service/get-all-albums.service';
import { AlbumRepository } from './persistence/albums.repository';
import { FindAlbumsByUserIdService } from './core/events/find-albums-by-user-id.event';
import { FindAlbumPhotosService } from './core/service/find-album-photos.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    GetAllAlbumsService,
    AlbumRepository,
    FindAlbumsByUserIdService,
    FindAlbumPhotosService,
  ],
})
export class AlbumsModule {}
