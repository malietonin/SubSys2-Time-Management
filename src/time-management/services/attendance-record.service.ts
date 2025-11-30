import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AttendanceRecord, AttendanceRecordDocument, Punch } from '../models/attendance-record.schema';
import { CreateAttendancePunchDto } from '../dtos/create-attendance-record-dto';
import { PunchType } from '../models/enums/index';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { ScheduleRule, ScheduleRuleDocument } from '../models/schedule-rule.schema';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @InjectModel(AttendanceRecord.name)
    private attendanceModel: Model<AttendanceRecordDocument>,
    private employeeProfileService: EmployeeProfileService,
    @InjectModel(ScheduleRule.name)
    private scheduleRuleModel: Model<ScheduleRuleDocument>,

  ) {}

  
  async recordClockIn(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.IN) {
      throw new BadRequestException('Punch type must be IN.');
    }
  
    
    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
  
    let record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(dto.employeeId) });
    if (!record) {
      
      record = await this.attendanceModel.create({
        employeeId: new Types.ObjectId(dto.employeeId),
        punches: [],
        totalWorkMinutes: 0,
        hasMissedPunch: false,
      });
    }

    const scheduleRule = await this.scheduleRuleModel.findOne({ employeeId: dto.employeeId });
    if (!scheduleRule) {
      throw new NotFoundException('Schedule rule not found.');
    }
  
   
    const todayIndex = new Date().getDay();
    if (scheduleRule.pattern[todayIndex] === '0') {
      throw new BadRequestException('Cannot clock in on a rest day.');
    }
  
   
    const punch: Punch = { time: new Date(), type: dto.punchType };
    record.punches.push(punch);
    await record.save();
  
    return {
      success: true,
      message: 'Clocked in successfully!',
      data: record,
    };
  }
  
  
  async recordClockOut(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.OUT) {
      throw new BadRequestException('Punch type must be OUT.');
    }
  
    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
  
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(dto.employeeId) });
    if (!record) {
      throw new NotFoundException('No attendance record found.');
    }
  
    const scheduleRule = await this.scheduleRuleModel.findOne({ employeeId: dto.employeeId });
    if (!scheduleRule) {
      throw new NotFoundException('Schedule rule not found.');
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hasClockedInToday = record.punches.some(p => 
      p.type === PunchType.IN &&
      new Date(p.time).setHours(0, 0, 0, 0) === today.getTime()
    );
  
    if (!hasClockedInToday) {
      throw new BadRequestException('Cannot clock out without clocking in first.');
    }
  
    const now = new Date();
    const punch: Punch = { time: now, type: dto.punchType };
    record.punches.push(punch);
  
    // compute totalWorkMinutes based on first IN punch of the day
    const firstIn = record.punches.find(p => p.type === PunchType.IN && new Date(p.time).setHours(0,0,0,0) === today.getTime())?.time;
    if (firstIn) {
      record.totalWorkMinutes = Math.floor((now.getTime() - firstIn.getTime()) / 60000);
    }
  
    await record.save();
  
    return {
      success: true,
      message: 'Clocked out successfully!',
      data: record,
    };
  }
  

  // 4. detectMissedPunches
  async detectMissedPunches(employeeId: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');


    record.hasMissedPunch = record.punches.some((p, i, arr) => {
      if (p.type === PunchType.IN) {
        const next = arr[i + 1];
        return !next || next.type !== PunchType.OUT;
      }
      return false;
    });

    await record.save();
    return { success: true, message: 'Missed punches detected', data: record };
  }

  // 5. applyRoundingRules
  async applyRoundingRules(employeeId: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    // Apply rounding policy here (placeholder)
    // Example: round punch times to nearest 15 minutes

    return { success: true, message: 'Rounding rules applied', data: record };
  }

  // 6. calculateLateness
  async calculateLateness(employeeId: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    // Compare punches to scheduled shift and lateness rules (placeholder)

    return { success: true, message: 'Lateness calculated', data: record };
  }

  // 7. calculateOvertimeOrShortTime
  async calculateOvertimeOrShortTime(employeeId: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    // Compare actual vs. scheduled hours (placeholder)

    return { success: true, message: 'Overtime/Short time calculated', data: record };
  }

  // 8. syncAttendanceWithPayroll
  async syncAttendanceWithPayroll(employeeId: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    // Package and send attendance to payroll system (placeholder)

    return { success: true, message: 'Attendance synced with payroll', data: record };
  }
}
