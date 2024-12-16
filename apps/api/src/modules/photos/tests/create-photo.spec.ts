import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../shared/config/database';
import { PhotosController } from '../http/photos.controller';
import { CreatePhotoService } from '../core/services/create-photo.service';
import { PhotosService } from '../core/services/photos.service';
import { FindPhotosByAlbumIdService } from '../core/events/find-photos-by-album-id.event';
import { PhotoRepository } from '../persistence/photos.repository';
import { UpdatePhotoService } from '../core/services/update-photo.service';
import { RemovePhotoService } from '../core/services/remove-photo.service';
import { CreatePhotoDto } from '../core/dto/create-photo.dto';

describe('CreatePhoto', () => {
  let controller: PhotosController;
  let createPhotoService: CreatePhotoService;

  const mockCreatePhotoService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PhotosController],
      providers: [
        {
          provide: CreatePhotoService,
          useValue: mockCreatePhotoService,
        },
        PhotosService,
        FindPhotosByAlbumIdService,
        PhotoRepository,
        UpdatePhotoService,
        RemovePhotoService,
      ],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
    createPhotoService = module.get<CreatePhotoService>(CreatePhotoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createPhotoService).toBeDefined();
  });

  it('should create a photo', async () => {
    const createPhotoDto: CreatePhotoDto = {
      albumId: 1,
      url: 'https://example.com/photo.jpg',
      title: 'Teste',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
    };
    const result = await controller.create(createPhotoDto);
    expect(result).toEqual({
      status: true,
      message: 'Foto criada com sucesso.',
    });
  });

  it('if a title is already in use, should return an error', async () => {
    const createPhotoDto: CreatePhotoDto = {
      albumId: 1,
      url: 'https://example.com/photo.jpg',
      title: 'Teste',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
    };
    jest
      .spyOn(createPhotoService, 'execute')
      .mockRejectedValue(new Error('Foto já existe.'));

    await expect(controller.create(createPhotoDto)).rejects.toThrow(
      'Foto já existe.',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
