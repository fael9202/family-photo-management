import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('redis.host', { infer: true }) ?? '';
  }
  get port(): number {
    return Number(this.configService.get<number>('redis.port'));
  }
}
