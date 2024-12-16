import { Test, TestingModule } from '@nestjs/testing';
import { FindUserAlbumsService } from '../core/services/find-user-albums.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersQueryDto } from '../core/dto/users-query.dto';
import { UsersController } from '../http/users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../../shared/config/database';
import { ChangePasswordService } from '../core/services/change-password.service';
import { GetAllUsersService } from '../core/services/get-all-users.service';
import { UserRepository } from '../persistence/user.repository';
import { EmailNotificationEmitter } from '../core/events/email-notification-emitter';
import { LoginService } from '../core/services/login.service';
import { SendEmailService } from '../core/services/send-email.service';

describe('UsersController - getUserAlbums', () => {
  let controller: UsersController;
  let findUserAlbumsService: FindUserAlbumsService;

  // Mock do serviço de busca de álbuns
  const mockFindUserAlbumsService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'test-secret',
          signOptions: { expiresIn: '60s' },
        }),
        EventEmitterModule.forRoot(),
        DatabaseModule,
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: FindUserAlbumsService,
          useValue: mockFindUserAlbumsService,
        },
        ChangePasswordService,
        GetAllUsersService,
        UserRepository,
        EmailNotificationEmitter,
        JwtService,
        LoginService,
        SendEmailService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    findUserAlbumsService = module.get<FindUserAlbumsService>(
      FindUserAlbumsService,
    );
  });

  // Teste de busca de álbuns com sucesso
  it('should get user albums successfully', async () => {
    // Prepare dados de teste
    const userId = '1';
    const query: UsersQueryDto = {
      page: '1',
      pageSize: '10',
    };

    // Mock do resultado do serviço
    const mockUserAlbums = {
      albums: [
        { id: 1, title: 'Album 1', userId: 1 },
        { id: 2, title: 'Album 2', userId: 1 },
      ],
      totalPages: 1,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      userName: 'testuser',
      email: 'test@example.com',
    };

    // Configura o mock do serviço para retornar os álbuns
    jest
      .spyOn(findUserAlbumsService, 'execute')
      .mockResolvedValue(mockUserAlbums);

    // Executa o método do controlador
    const result = await controller.getUserAlbums(userId, query);

    // Verificações
    expect(result).toEqual({
      status: true,
      message: 'Álbuns encontrados com sucesso.',
      data: mockUserAlbums,
    });

    // Verifica se o serviço foi chamado com os parâmetros corretos
    expect(findUserAlbumsService.execute).toHaveBeenCalledWith(userId, query);
  });

  // Teste de tratamento de erro quando usuário não é encontrado
  it('should handle user not found', async () => {
    const userId = '999'; // ID de usuário inexistente
    const query: UsersQueryDto = {
      page: '1',
      pageSize: '10',
    };

    // Configura o mock para lançar uma exceção
    jest
      .spyOn(findUserAlbumsService, 'execute')
      .mockRejectedValue(new Error('Usuário não encontrado.'));

    // Verifica se a exceção é lançada
    await expect(controller.getUserAlbums(userId, query)).rejects.toThrow(
      'Usuário não encontrado.',
    );
  });

  // Teste de paginação
  it('should handle pagination', async () => {
    const userId = '1';
    const query: UsersQueryDto = {
      page: '2',
      pageSize: '5',
    };

    const mockUserAlbums = {
      albums: [
        { id: 6, title: 'Album 6', userId: 1 },
        { id: 7, title: 'Album 7', userId: 1 },
      ],
      totalPages: 3,
      currentPage: 2,
      nextPage: 3,
      prevPage: 1,
      userName: 'testuser',
      email: 'test@example.com',
    };

    jest
      .spyOn(findUserAlbumsService, 'execute')
      .mockResolvedValue(mockUserAlbums);

    const result = await controller.getUserAlbums(userId, query);

    expect(result.data.currentPage).toBe(2);
    expect(result.data.nextPage).toBe(3);
    expect(result.data.prevPage).toBe(1);
  });

  // Limpa os mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks();
  });
});
