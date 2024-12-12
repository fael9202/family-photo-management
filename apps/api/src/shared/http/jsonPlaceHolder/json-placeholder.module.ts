import { Module } from '@nestjs/common';
import { JsonPlaceholderService } from './json-placeholder.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JsonPlaceholderService],
  exports: [JsonPlaceholderService],
})
export class JsonPlaceHolderModule {}
