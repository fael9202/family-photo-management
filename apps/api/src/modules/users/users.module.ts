import { Module } from '@nestjs/common';
import { UsersService } from './core/users.service';
import { UsersController } from './http/users.controller';
import { SendEmailService } from './core/services/send-email.service';
import { NotificationModule } from 'src/shared/notification/notification.module';
import { EmailNotificationEmitter } from './core/events/email-notification-emitter';

@Module({
  imports: [NotificationModule],
  controllers: [UsersController],
  providers: [UsersService, SendEmailService, EmailNotificationEmitter],
})
export class UsersModule {}
