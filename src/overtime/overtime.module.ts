import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Overtime, OvertimeSchema } from './models/overtime.model';
import { OvertimeService } from './overtime.service';
import { OvertimeController } from './overtime.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Overtime.name, schema: OvertimeSchema },
    ]),
  ],
  controllers: [OvertimeController],
  providers: [OvertimeService],
})
export class OvertimeModule {}
