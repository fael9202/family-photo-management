import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersQueryDto } from 'src/modules/users/core/dto/users-query.dto';
import { AlbumsEvent } from 'src/shared/utils/enums/events.enum';
import { AlbumRepository } from '../../persistence/albums.repository';
import { UserAlbums } from 'src/modules/users/core/services/find-user-albums.service';

@Injectable()
export class FindAlbumsByUserIdService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  @OnEvent(AlbumsEvent.findAlbumsByUserId)
  async findAlbumsByUserId(
    userId: number,
    query: UsersQueryDto,
  ): Promise<UserAlbums> {
    const { page, pageSize } = query;
    const albums = await this.albumRepository.findAlbumsByUserId(
      userId,
      Number(page),
      Number(pageSize),
    );
    const albumsCount =
      await this.albumRepository.findAlbumsByUserIdCount(userId);

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
