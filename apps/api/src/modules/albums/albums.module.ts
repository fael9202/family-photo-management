import { Module } from '@nestjs/common';
import { AlbumsController } from './http/albums.controller';
import { GetAllAlbumsService } from './core/service/get-all-albums.service';
import { AlbumRepository } from './persistence/albums.repository';
import { FindAlbumsByUserIdService } from './core/events/find-albums-by-user-id.event';

@Module({
  controllers: [AlbumsController],
  providers: [GetAllAlbumsService, AlbumRepository, FindAlbumsByUserIdService],
})
export class AlbumsModule {}
