import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../shared/config/database';

import { IUserGuard } from '../../../shared/utils/interfaces/user/user-guard.interface';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AlbumsController } from '../http/albums.controller';
import { UpdateAlbumService } from '../core/service/update-album.service';
import { GetAllAlbumsService } from '../core/service/get-all-albums.service';
import { AlbumRepository } from '../persistence/albums.repository';
import { FindAlbumsByUserIdService } from '../core/events/find-albums-by-user-id.event';
import { FindAlbumPhotosService } from '../core/service/find-album-photos.service';
import { CreateAlbumService } from '../core/service/create-album.service';
import { RemoveAlbumService } from '../core/service/remove-album.service';
import { UpdateAlbumDto } from '../core/dto/update-album.dto';

describe('UpdateAlbum', () => {
  let controller: AlbumsController;
  let updateAlbumService: UpdateAlbumService;

  const mockUpdateAlbumService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, EventEmitterModule.forRoot()],
      controllers: [AlbumsController],
      providers: [
        {
          provide: UpdateAlbumService,
          useValue: mockUpdateAlbumService,
        },
        GetAllAlbumsService,
        AlbumRepository,
        FindAlbumsByUserIdService,
        FindAlbumPhotosService,
        RemoveAlbumService,
        CreateAlbumService,
      ],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
    updateAlbumService = module.get<UpdateAlbumService>(UpdateAlbumService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(updateAlbumService).toBeDefined();
  });

  const user: IUserGuard = {
    id: 1,
    email: 'teste@teste.com',
    name: 'Teste',
    username: 'teste',
  };

  it('should update a album', async () => {
    const updateAlbumId = '1';
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Teste',
    };

    const result = await controller.update(updateAlbumId, updateAlbumDto, user);
    expect(result).toEqual({
      status: true,
      message: 'Álbum atualizado com sucesso.',
    });
  });

  it('if a album is not found, should return an error', async () => {
    const updateAlbumId = '1';
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Teste',
    };
    jest
      .spyOn(updateAlbumService, 'execute')
      .mockRejectedValue(new Error('Álbum não encontrado.'));

    await expect(
      controller.update(updateAlbumId, updateAlbumDto, user),
    ).rejects.toThrow('Álbum não encontrado.');
  });

  it('if a album is not from the user, should return an error', async () => {
    const updateAlbumId = '1';
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Teste',
    };

    jest
      .spyOn(updateAlbumService, 'execute')
      .mockRejectedValue(new Error('Este álbum não pertence a você.'));

    await expect(
      controller.update(updateAlbumId, updateAlbumDto, user),
    ).rejects.toThrow('Este álbum não pertence a você.');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
