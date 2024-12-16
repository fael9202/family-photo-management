import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../shared/config/database';
import { AlbumsController } from '../http/albums.controller';
import { CreateAlbumService } from '../core/service/create-album.service';
import { GetAllAlbumsService } from '../core/service/get-all-albums.service';
import { AlbumRepository } from '../persistence/albums.repository';
import { FindAlbumsByUserIdService } from '../core/events/find-albums-by-user-id.event';
import { FindAlbumPhotosService } from '../core/service/find-album-photos.service';
import { UpdateAlbumService } from '../core/service/update-album.service';
import { RemoveAlbumService } from '../core/service/remove-album.service';
import { CreateAlbumDto } from '../core/dto/create-album.dto';
import { IUserGuard } from '@/shared/utils/interfaces/user/user-guard.interface';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('CreateAlbum', () => {
  let controller: AlbumsController;
  let createAlbumService: CreateAlbumService;

  const mockCreateAlbumService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, EventEmitterModule.forRoot()],
      controllers: [AlbumsController],
      providers: [
        {
          provide: CreateAlbumService,
          useValue: mockCreateAlbumService,
        },
        GetAllAlbumsService,
        AlbumRepository,
        FindAlbumsByUserIdService,
        FindAlbumPhotosService,
        UpdateAlbumService,
        RemoveAlbumService,
      ],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
    createAlbumService = module.get<CreateAlbumService>(CreateAlbumService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createAlbumService).toBeDefined();
  });

  const user: IUserGuard = {
    id: 1,
    email: 'teste@teste.com',
    name: 'Teste',
    username: 'teste',
  };

  it('should create a album', async () => {
    const createAlbumDto: CreateAlbumDto = {
      title: 'Teste',
    };
    const result = await controller.create(createAlbumDto, user);
    expect(result).toEqual({
      status: true,
      message: 'Álbum criado com sucesso.',
    });
  });

  it('if a title is already in use, should return an error', async () => {
    const createAlbumDto: CreateAlbumDto = {
      title: 'Teste',
    };
    jest
      .spyOn(createAlbumService, 'execute')
      .mockRejectedValue(new Error('Foto já existe.'));

    await expect(controller.create(createAlbumDto, user)).rejects.toThrow(
      'Foto já existe.',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
