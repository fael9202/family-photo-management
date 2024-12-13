import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PhotoRepository } from '../../persistence/photos.repository';
import { CreatePhotoDto } from '../dto/create-photo.dto';

@Injectable()
export class CreatePhotoService {
  constructor(private readonly photosRepository: PhotoRepository) {}

  async execute(createPhotoDto: CreatePhotoDto) {
    const { title } = createPhotoDto;

    const photo = await this.photosRepository.findByTitle(title);

    if (photo) {
      throw new HttpException(
        { status: false, message: 'Foto já existe.' },
        HttpStatus.CONFLICT,
      );
    }

    const newPhoto = await this.photosRepository.create(createPhotoDto);
    return newPhoto;
  }
}
