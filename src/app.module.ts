import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShiftAssignmentModule } from './shift-assignment/shift-assignment.module';
import { ShiftModule } from './shift/shift.module';
import { AttendanceModule } from './attendance/attendance.module';
import { FalsePenaltyModule } from './false-penalty/false-penalty.module';
import { OvertimeModule } from './overtime/overtime.module';
import { EscalationModule } from './escalation/escalation.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://CDBUser:CDBPass@swp1-clouddb.jxujaha.mongodb.net/?retryWrites=true&w=majority&appName=SWP1-DB'),
    ShiftAssignmentModule,
    ShiftModule,
    AttendanceModule,
    FalsePenaltyModule, 
    OvertimeModule,
    EscalationModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 
