import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumRepository } from '../../persistence/albums.repository';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';

@Injectable()
export class CreateAlbumService {
  constructor(private readonly albumsRepository: AlbumRepository) {}

  async execute(createAlbumDto: CreateAlbumDto, user: IUserGuard) {
    const { title } = createAlbumDto;

    const album = await this.albumsRepository.findByTitle(title);

    if (album) {
      throw new HttpException(
        { status: false, message: 'Álbum já existe.' },
        HttpStatus.CONFLICT,
      );
    }

    const newAlbum = await this.albumsRepository.create(
      createAlbumDto,
      user.id,
    );
    return newAlbum;
  }
}
