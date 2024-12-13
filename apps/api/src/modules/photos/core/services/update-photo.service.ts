import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PhotoRepository } from '../../persistence/photos.repository';
import { UpdatePhotoDto } from '../dto/update-photo.dto';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';

@Injectable()
export class UpdatePhotoService {
  constructor(private readonly photosRepository: PhotoRepository) {}

  async execute(id: number, updatePhotoDto: UpdatePhotoDto, user: IUserGuard) {
    //validar se o usuário é o dono da foto
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

    const updatedPhoto = await this.photosRepository.update(id, updatePhotoDto);

    return updatedPhoto;
  }
}
