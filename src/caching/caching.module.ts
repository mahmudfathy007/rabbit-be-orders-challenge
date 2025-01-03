import { Module } from '@nestjs/common';
import { CacheService } from './caching.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],

})
export class CacheModule {}
