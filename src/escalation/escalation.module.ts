import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Escalation, EscalationSchema } from './models/escalation.model';
import { EscalationService } from './escalation.service';
import { EscalationController } from './escalation.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Escalation.name, schema: EscalationSchema },
    ]),
  ],
  controllers: [EscalationController],
  providers: [EscalationService],
})
export class EscalationModule {}
