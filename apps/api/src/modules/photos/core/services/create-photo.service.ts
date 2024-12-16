import { Injectable } from '@nestjs/common';
import { PhotoRepository } from '../../persistence/photos.repository';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import CustomError from '../../../../shared/utils/exceptions/custom-error';
import statusCode from '../../../../shared/utils/exceptions/statusCode';

@Injectable()
export class CreatePhotoService {
  constructor(private readonly photosRepository: PhotoRepository) {}

  async execute(createPhotoDto: CreatePhotoDto) {
    const { title } = createPhotoDto;

    const photo = await this.photosRepository.findByTitle(title);

    if (photo) {
      throw new CustomError('Foto já existe.', statusCode.CONFLICT);
    }

    const newPhoto = await this.photosRepository.create(createPhotoDto);
    return newPhoto;
  }
}
