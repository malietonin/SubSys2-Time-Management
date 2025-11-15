 import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FalsePenalty, FalsePenaltySchema } from './models/falsePenalty.model';
import { FalsePenaltyService } from './falsePenalty.service';
import { FalsePenaltyController } from './falsePenalty.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FalsePenalty.name, schema: FalsePenaltySchema },
    ]),
  ],
  controllers: [FalsePenaltyController],
  providers: [FalsePenaltyService],
})
export class FalsePenaltyModule {}
