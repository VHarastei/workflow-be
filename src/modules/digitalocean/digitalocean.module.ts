import { Module } from '@nestjs/common';
import { DigitalOceanService } from './digitalocean.service';

@Module({
  providers: [DigitalOceanService],
  exports: [DigitalOceanService],
})
export class DigitalOceanModule {}
