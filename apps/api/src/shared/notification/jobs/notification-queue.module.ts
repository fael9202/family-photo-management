import { Module } from '@nestjs/common';
import { EmailNotificationProcessor } from './email-notification-queue.processor';

@Module({
  providers: [
    // Processors
    EmailNotificationProcessor,
  ],
  exports: [EmailNotificationProcessor],
})
export class NotificationQueueModule {}
