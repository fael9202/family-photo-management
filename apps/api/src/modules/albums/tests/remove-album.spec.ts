import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../shared/config/database';
import { IUserGuard } from '../../../shared/utils/interfaces/user/user-guard.interface';
import { AlbumsController } from '../http/albums.controller';
import { RemoveAlbumService } from '../core/service/remove-album.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GetAllAlbumsService } from '../core/service/get-all-albums.service';
import { AlbumRepository } from '../persistence/albums.repository';
import { FindAlbumsByUserIdService } from '../core/events/find-albums-by-user-id.event';
import { FindAlbumPhotosService } from '../core/service/find-album-photos.service';
import { UpdateAlbumService } from '../core/service/update-album.service';
import { CreateAlbumService } from '../core/service/create-album.service';

describe('RemoveAlbum', () => {
  let controller: AlbumsController;
  let removeAlbumService: RemoveAlbumService;

  const mockRemoveAlbumService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, EventEmitterModule.forRoot()],
      controllers: [AlbumsController],
      providers: [
        {
          provide: RemoveAlbumService,
          useValue: mockRemoveAlbumService,
        },
        GetAllAlbumsService,
        AlbumRepository,
        FindAlbumsByUserIdService,
        FindAlbumPhotosService,
        UpdateAlbumService,
        CreateAlbumService,
      ],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
    removeAlbumService = module.get<RemoveAlbumService>(RemoveAlbumService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(removeAlbumService).toBeDefined();
  });

  const user: IUserGuard = {
    id: 1,
    email: 'teste@teste.com',
    name: 'Teste',
    username: 'teste',
  };

  it('should remove a album', async () => {
    const removeAlbumId = '1';

    const result = await controller.remove(removeAlbumId, user);
    expect(result).toEqual({
      status: true,
      message: 'Álbum removido com sucesso.',
    });
  });

  it('if a album is not found, should return an error', async () => {
    const removeAlbumId = '1';
    jest
      .spyOn(removeAlbumService, 'execute')
      .mockRejectedValue(new Error('Álbum não encontrado.'));

    await expect(controller.remove(removeAlbumId, user)).rejects.toThrow(
      'Álbum não encontrado.',
    );
  });

  it('if a album is not from the user, should return an error', async () => {
    const removeAlbumId = '1';

    jest
      .spyOn(removeAlbumService, 'execute')
      .mockRejectedValue(new Error('Este álbum não pertence a você.'));

    await expect(controller.remove(removeAlbumId, user)).rejects.toThrow(
      'Este álbum não pertence a você.',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
