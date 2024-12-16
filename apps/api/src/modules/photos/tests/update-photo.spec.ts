import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../shared/config/database';
import { PhotosController } from '../http/photos.controller';
import { CreatePhotoService } from '../core/services/create-photo.service';
import { PhotosService } from '../core/services/photos.service';
import { FindPhotosByAlbumIdService } from '../core/events/find-photos-by-album-id.event';
import { PhotoRepository } from '../persistence/photos.repository';
import { UpdatePhotoService } from '../core/services/update-photo.service';
import { RemovePhotoService } from '../core/services/remove-photo.service';
import { IUserGuard } from '../../../shared/utils/interfaces/user/user-guard.interface';
import { UpdatePhotoDto } from '../core/dto/update-photo.dto';

describe('UpdatePhoto', () => {
  let controller: PhotosController;
  let updatePhotoService: UpdatePhotoService;

  const mockUpdatePhotoService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PhotosController],
      providers: [
        {
          provide: UpdatePhotoService,
          useValue: mockUpdatePhotoService,
        },
        PhotosService,
        FindPhotosByAlbumIdService,
        PhotoRepository,
        RemovePhotoService,
        CreatePhotoService,
      ],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
    updatePhotoService = module.get<UpdatePhotoService>(UpdatePhotoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(updatePhotoService).toBeDefined();
  });

  const user: IUserGuard = {
    id: 1,
    email: 'teste@teste.com',
    name: 'Teste',
    username: 'teste',
  };

  it('should update a photo', async () => {
    const updatePhotoId = '1';
    const updatePhotoDto: UpdatePhotoDto = {
      title: 'Teste',
    };

    const result = await controller.update(updatePhotoId, updatePhotoDto, user);
    expect(result).toEqual({
      status: true,
      message: 'Foto atualizada com sucesso.',
    });
  });

  it('if a photo is not found, should return an error', async () => {
    const updatePhotoId = '1';
    const updatePhotoDto: UpdatePhotoDto = {
      title: 'Teste',
    };
    jest
      .spyOn(updatePhotoService, 'execute')
      .mockRejectedValue(new Error('Foto não encontrada.'));

    await expect(
      controller.update(updatePhotoId, updatePhotoDto, user),
    ).rejects.toThrow('Foto não encontrada.');
  });

  it('if a photo is not from the user, should return an error', async () => {
    const updatePhotoId = '1';
    const updatePhotoDto: UpdatePhotoDto = {
      title: 'Teste',
    };

    jest
      .spyOn(updatePhotoService, 'execute')
      .mockRejectedValue(new Error('Esta foto não pertence a você.'));

    await expect(
      controller.update(updatePhotoId, updatePhotoDto, user),
    ).rejects.toThrow('Esta foto não pertence a você.');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
