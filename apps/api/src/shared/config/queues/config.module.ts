import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { RedisConfigModule, RedisConfigService } from '../redis';
import { QueueConfigService } from './config.service';
import { NotificationQueueModule } from 'src/shared/notification/jobs';
import { NotificationQueues } from 'src/shared/enums/events.enum';

@Module({
  imports: [
    RedisConfigModule,
    BullModule.forRootAsync({
      imports: [RedisConfigModule],
      useClass: QueueConfigService,
      inject: [RedisConfigService],
    }),
    BullModule.registerQueue({ name: NotificationQueues.email }),
    NotificationQueueModule,
  ],
  providers: [QueueConfigService],
  exports: [BullModule],
})
export class QueueConfigModule {}
