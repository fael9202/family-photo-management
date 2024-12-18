import { Module } from '@nestjs/common';
import { UsersService } from './core/users.service';
import { UsersController } from './http/users.controller';
import { SendEmailService } from './core/services/send-email.service';
import { NotificationModule } from '../../shared/notification/notification.module';
import { EmailNotificationEmitter } from './core/events/email-notification-emitter';
import { ChangePasswordService } from './core/services/change-password.service';
import { UserRepository } from './persistence/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './core/services/login.service';
import { GetAllUsersService } from './core/services/get-all-users.service';
import { FindUserAlbumsService } from './core/services/find-user-albums.service';

@Module({
  imports: [NotificationModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    SendEmailService,
    ChangePasswordService,
    LoginService,
    GetAllUsersService,
    FindUserAlbumsService,
    UserRepository,
    EmailNotificationEmitter,
    JwtService,
  ],
})
export class UsersModule {}
