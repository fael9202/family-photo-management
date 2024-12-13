import { Module } from '@nestjs/common';
import { AlbumsController } from './http/albums.controller';
import { GetAllAlbumsService } from './core/service/get-all-albums.service';
import { AlbumRepository } from './persistence/albums.repository';

@Module({
  controllers: [AlbumsController],
  providers: [GetAllAlbumsService, AlbumRepository],
})
export class AlbumsModule {}
