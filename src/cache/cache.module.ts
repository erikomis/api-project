import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 9999,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModuleProject {}
