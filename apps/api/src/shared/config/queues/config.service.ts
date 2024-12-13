import { SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { QueueOptions } from 'bull';
import { RedisConfigService } from '../redis';

@Injectable()
export class QueueConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly redisConfigService: RedisConfigService) {}

  createSharedConfiguration(): QueueOptions {
    return {
      redis: {
        host: this.redisConfigService.host,
        port: this.redisConfigService.port,
      },
    };
  }
}
