import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';
import { AlbumRepository } from '../../persistence/albums.repository';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class UpdateAlbumService {
  constructor(private readonly albumsRepository: AlbumRepository) {}

  async execute(id: number, updateAlbumDto: UpdateAlbumDto, user: IUserGuard) {
    //validar se o usuário é o dono do álbum
    const albumByTitle = await this.albumsRepository.findByTitle(
      updateAlbumDto.title,
    );

    if (albumByTitle) {
      throw new HttpException(
        { status: false, message: 'Este álbum já existe.' },
        HttpStatus.BAD_REQUEST,
      );
    }

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

    const updatedAlbum = await this.albumsRepository.update(id, updateAlbumDto);

    return updatedAlbum;
  }
}
