import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumRepository } from '../../persistence/albums.repository';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';

@Injectable()
export class RemoveAlbumService {
  constructor(private readonly albumsRepository: AlbumRepository) {}

  async execute(id: number, user: IUserGuard) {
    const album = await this.albumsRepository.findAlbumById(id);
    if (!album) {
      throw new HttpException(
        { status: false, message: 'Álbum não encontrado.' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (album.user.id !== user.id) {
      throw new HttpException(
        { status: false, message: 'Este álbum não pertence a você.' },
        HttpStatus.FORBIDDEN,
      );
    }

    const deletedAlbum = await this.albumsRepository.delete(id);

    return deletedAlbum;
  }
}
