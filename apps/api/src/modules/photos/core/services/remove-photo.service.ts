import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PhotoRepository } from '../../persistence/photos.repository';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';

@Injectable()
export class RemovePhotoService {
  constructor(private readonly photosRepository: PhotoRepository) {}

  async execute(id: number, user: IUserGuard) {
    const photo = await this.photosRepository.findById(id);
    if (!photo) {
      throw new HttpException(
        { status: false, message: 'Foto não encontrada.' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (photo.album.user.id !== user.id) {
      throw new HttpException(
        { status: false, message: 'Esta foto não pertence a você.' },
        HttpStatus.FORBIDDEN,
      );
    }

    const deletedPhoto = await this.photosRepository.delete(id);

    return deletedPhoto;
  }
}
