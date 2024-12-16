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

describe('RemovePhoto', () => {
  let controller: PhotosController;
  let removePhotoService: RemovePhotoService;

  const mockRemovePhotoService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PhotosController],
      providers: [
        {
          provide: RemovePhotoService,
          useValue: mockRemovePhotoService,
        },
        PhotosService,
        FindPhotosByAlbumIdService,
        PhotoRepository,
        UpdatePhotoService,
        CreatePhotoService,
      ],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
    removePhotoService = module.get<RemovePhotoService>(RemovePhotoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(removePhotoService).toBeDefined();
  });

  const user: IUserGuard = {
    id: 1,
    email: 'teste@teste.com',
    name: 'Teste',
    username: 'teste',
  };

  it('should remove a photo', async () => {
    const removePhotoId = '1';

    const result = await controller.remove(removePhotoId, user);
    expect(result).toEqual({
      status: true,
      message: 'Foto removida com sucesso.',
    });
  });

  it('if a photo is not found, should return an error', async () => {
    const removePhotoId = '1';
    jest
      .spyOn(removePhotoService, 'execute')
      .mockRejectedValue(new Error('Foto não encontrada.'));

    await expect(controller.remove(removePhotoId, user)).rejects.toThrow(
      'Foto não encontrada.',
    );
  });

  it('if a photo is not from the user, should return an error', async () => {
    const removePhotoId = '1';

    jest
      .spyOn(removePhotoService, 'execute')
      .mockRejectedValue(new Error('Esta foto não pertence a você.'));

    await expect(controller.remove(removePhotoId, user)).rejects.toThrow(
      'Esta foto não pertence a você.',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
