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
import { SchedulingModule } from './scheduling/scheduling.module';
import { CorrectionRequestModule } from './correction-request/correction-request.module';
import { EscalationModule } from './escalation/escalation.module';
import { NotificationModule } from './notification/notification.module';
import { FalsePenaltyModule } from './false-penalty/false-penalty.module';
import { FalseModule } from './penalty/false/false.module';
import { OvertimeModule } from './overtime/overtime.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { NotificationModule } from './notification/notification.module';
import { CorrectionRequestModule } from './correction-request/correction-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL!),
    ShiftAssignmentModule,
    ShiftModule,
    AttendanceModule,
    FalsePenaltyModule, 
    OvertimeModule,
    EscalationModule,
    SchedulingModule,
    CorrectionRequestModule,
    NotificationModule,
    FalseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 
