import { Module } from '@nestjs/common';
import { FalsePenaltyService } from './false-penalty.service';
import { FalsePenaltyController } from './false-penalty.controller';

@Module({
  controllers: [FalsePenaltyController],
  providers: [FalsePenaltyService],
})
export class FalsePenaltyModule {}
