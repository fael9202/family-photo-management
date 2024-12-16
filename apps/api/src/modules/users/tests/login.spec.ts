import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../http/users.controller';
import { SendEmailService } from '../core/services/send-email.service';
import { ChangePasswordService } from '../core/services/change-password.service';
import { LoginService } from '../core/services/login.service';
import { GetAllUsersService } from '../core/services/get-all-users.service';
import { FindUserAlbumsService } from '../core/services/find-user-albums.service';
import { UserRepository } from '../persistence/user.repository';
import { EmailNotificationEmitter } from '../core/events/email-notification-emitter';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '../../../shared/config/database';
import { LoginDto } from '../core/dto/login.dto';

// Mock dos serviços para testes mais isolados
const mockLoginService = {
  login: jest.fn(),
};

const mockSendEmailService = {
  // Adicione métodos mockados conforme necessário
};

describe('UsersController', () => {
  let controller: UsersController;
  let loginService: LoginService;

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
          provide: LoginService,
          useValue: mockLoginService,
        },
        {
          provide: SendEmailService,
          useValue: mockSendEmailService,
        },
        ChangePasswordService,
        GetAllUsersService,
        FindUserAlbumsService,
        UserRepository,
        EmailNotificationEmitter,
        JwtService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login successfully', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 'test@example.com';
    loginDto.password = 'password123';

    // Mock o retorno do serviço de login com a estrutura correta
    const mockLoginResult = {
      status: true,
      message: 'Usuário autenticado com sucesso.',
      data: {
        token: 'fake-jwt-token',
        user: {
          id: 1,
          username: 'test@example.com',
          name: 'test',
          email: 'test@example.com',
        },
      },
    };

    jest.spyOn(loginService, 'login').mockResolvedValue({
      user: mockLoginResult.data.user,
      token: mockLoginResult.data.token,
    });

    // Execute o teste
    const result = await controller.login(loginDto);

    // Verificações
    expect(result).toEqual(mockLoginResult);
    expect(result).toHaveProperty('status', true);
    expect(result).toHaveProperty(
      'message',
      'Usuário autenticado com sucesso.',
    );
    expect(result).toHaveProperty('data.token', 'fake-jwt-token');
    expect(loginService.login).toHaveBeenCalledWith(loginDto);
  });

  it('should handle login failure', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 'invalid@example.com';
    loginDto.password = 'wrongpassword';

    // Mock para simular falha de login
    jest
      .spyOn(loginService, 'login')
      .mockRejectedValue(new Error('Invalid credentials'));

    // Espera que o teste lance uma exceção
    await expect(controller.login(loginDto)).rejects.toThrow(
      'Invalid credentials',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
