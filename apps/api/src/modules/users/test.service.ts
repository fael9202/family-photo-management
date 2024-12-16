import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './core/services/login.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './persistence/user.repository';

describe('TestService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService, EventEmitter2, UserRepository, JwtService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
