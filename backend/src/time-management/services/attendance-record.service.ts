 import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AttendanceRecord, AttendanceRecordDocument, Punch } from '../models/attendance-record.schema';
import { CreateAttendancePunchDto } from '../dtos/create-attendance-record-dto';
import { PunchType } from '../models/enums/index';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { ScheduleRule, ScheduleRuleDocument } from '../models/schedule-rule.schema';
import { ShiftAssignment, ShiftAssignmentDocument } from '../models/shift-assignment.schema';
import { LatenessRuleService } from './lateness-rule.service';
import { CreateAttendanceRecordDto } from '../dtos/attendance-record-dto';
import { UpdateAttendanceRecordDto } from '../dtos/update-attendance-record-dto';
import { HolidayService } from './holiday.service';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @InjectModel(AttendanceRecord.name)
    private attendanceModel: Model<AttendanceRecordDocument>,
    private employeeProfileService: EmployeeProfileService,
    @InjectModel(ScheduleRule.name)
    private scheduleRuleModel: Model<ScheduleRuleDocument>,
    @InjectModel(ShiftAssignment.name)
    private shiftAssignmentModel: Model<ShiftAssignmentDocument>,
    private latenessRuleService: LatenessRuleService,
    private holidayService: HolidayService // Added HolidayService dependency
  ) {}

  async createAttendanceRecord(dto: CreateAttendanceRecordDto) {
    if (!dto.employeeId) {
      throw new BadRequestException('Employee ID is required.');
    }

    const record = await this.attendanceModel.create(dto);

    return {
      success: true,
      message: 'Attendance record created successfully!',
      data: record,
    };
  }

  async updateAttendanceRecord(id: string, dto: UpdateAttendanceRecordDto) {
    const record = await this.attendanceModel.findById(id);
    if (!record) throw new NotFoundException('Attendance record not found!');

    if (dto.employeeId !== undefined) record.employeeId = dto.employeeId;
    if (dto.punches !== undefined) record.punches = dto.punches;
    if (dto.totalWorkMinutes !== undefined) record.totalWorkMinutes = dto.totalWorkMinutes;
    if (dto.hasMissedPunch !== undefined) record.hasMissedPunch = dto.hasMissedPunch;
    if (dto.exceptionIds !== undefined) record.exceptionIds = dto.exceptionIds;
    if (dto.finalisedForPayroll !== undefined) record.finalisedForPayroll = dto.finalisedForPayroll;

    await record.save();

    return {
      success: true,
      message: 'Attendance record updated successfully!',
      data: record,
    };
  }

  async flagRepeatedLateness(employeeId: string) {
    const records = await this.attendanceModel.find({ employee: new Types.ObjectId(employeeId) });
    if (!records.length) throw new NotFoundException('No attendance records found for this employee.');

    const repeated = await this.latenessRuleService.detectRepeatedLateness(employeeId);

    return {
      success: true,
      message: repeated ? 'Employee has repeated lateness.' : 'Employee lateness is within acceptable limits.',
      data: { repeated },
    };
  }

  // malak added
  async recordClockIn(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.IN) {
      throw new BadRequestException('Punch type must be IN.');
    }

    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    let record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(dto.employeeId),
    });

    if (!record) {
      record = await this.attendanceModel.create({
        employeeId: new Types.ObjectId(dto.employeeId),
        punches: [],
        totalWorkMinutes: 0,
        hasMissedPunch: false,
      });
    }

    const punch: Punch = { time: new Date(), type: PunchType.IN };
    record.punches.push(punch);
    await record.save();

    return {
      success: true,
      message: 'Clocked in successfully!',
      data: record,
    };

    /*async recordClockIn(dto: CreateAttendancePunchDto) {
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
    */

    /*malak deletedit const scheduleRule = await this.scheduleRuleModel.findOne({ employeeId: dto.employeeId });
      if (!scheduleRule) {
        throw new NotFoundException('Schedule rule not found.');
      }*/

    /* malak deleted const todayIndex = new Date().getDay();
      if (scheduleRule.pattern[todayIndex] === '0') {
        throw new BadRequestException('Cannot clock in on a rest day.');
      }
    */

    // Check if today is a holiday
    /* malak deleted const today = new Date();
      const isHoliday = await this.holidayService.getAllHolidays().then(holidays =>
        holidays.data.some(holiday => {
          const holidayDate = new Date(holiday.startDate);
          return holidayDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
        })
      );
    */

    /* if (isHoliday) {
      throw new BadRequestException('Cannot clock in on a holiday.');
    } */
  }
async detectMissedPunches(employeeId: string) {
  const record = await this.attendanceModel.findOne({
    employeeId: new Types.ObjectId(employeeId),
  });
  if (!record) throw new NotFoundException('Attendance record not found');

  const missed = record.punches.some(
    (p, i, arr) =>
      p.type === PunchType.IN &&
      (!arr[i + 1] || arr[i + 1].type !== PunchType.OUT)
  );

  return { success: true, data: { missed } };
}

async listAttendanceForEmployee(employeeId: string) {
  const record = await this.attendanceModel.findOne({
    employeeId: new Types.ObjectId(employeeId),
  });
  if (!record) throw new NotFoundException('Attendance record not found');

  return { success: true, data: record.punches };
}

async updatePunchByTime(
  employeeId: string,
  punchTime: string,
  update: { time?: string; type?: 'IN' | 'OUT' }
) {
  const record = await this.attendanceModel.findOne({
    employeeId: new Types.ObjectId(employeeId),
  });
  if (!record) throw new NotFoundException('Attendance record not found');

  const punch = record.punches.find(
    p => new Date(p.time).toISOString() === new Date(punchTime).toISOString()
  );
  if (!punch) throw new NotFoundException('Punch not found');

  if (update.time) punch.time = new Date(update.time);
  if (update.type) punch.type = update.type as PunchType;

  await record.save();
  return { success: true };
}

async deletePunchByTime(employeeId: string, punchTime: string) {
  const record = await this.attendanceModel.findOne({
    employeeId: new Types.ObjectId(employeeId),
  });
  if (!record) throw new NotFoundException('Attendance record not found');

  record.punches = record.punches.filter(
    p => new Date(p.time).toISOString() !== new Date(punchTime).toISOString()
  );

  await record.save();
  return { success: true };
}

async deletePunchesForDate(employeeId: string, date: string) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const record = await this.attendanceModel.findOne({
    employeeId: new Types.ObjectId(employeeId),
  });
  if (!record) throw new NotFoundException('Attendance record not found');

  record.punches = record.punches.filter(p => {
    const d = new Date(p.time);
    d.setHours(0, 0, 0, 0);
    return d.getTime() !== target.getTime();
  });

  await record.save();
  return { success: true };
}

  async recordClockOut(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.OUT) {
      throw new BadRequestException('Punch type must be OUT.');
    }

    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) throw new NotFoundException('Employee not found.');

    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(dto.employeeId),
    });
    if (!record) throw new NotFoundException('No attendance record found.');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hasClockedInToday = record.punches.some(
      p =>
        p.type === PunchType.IN &&
        new Date(p.time).setHours(0, 0, 0, 0) === today.getTime()
    );

    if (!hasClockedInToday) {
      throw new BadRequestException('Cannot clock out without clocking in first.');
    }

    const now = new Date();
    const punch: Punch = { time: now, type: PunchType.OUT };
    record.punches.push(punch);

    const todayPunches = record.punches.filter(
      p => new Date(p.time).setHours(0, 0, 0, 0) === today.getTime()
    );

    let totalMinutes = 0;
    for (let i = 0; i < todayPunches.length; i++) {
      if (todayPunches[i].type === PunchType.IN) {
        const outPunch = todayPunches.slice(i + 1).find(p => p.type === PunchType.OUT);
        if (outPunch) {
          totalMinutes += Math.floor(
            (new Date(outPunch.time).getTime() -
              new Date(todayPunches[i].time).getTime()) / 60000
          );
          i = todayPunches.indexOf(outPunch);
        }
      }
    }
 // TEMP FIX FOR DEMO: reset punches after clock-out
record.totalWorkMinutes = 0;
record.punches = [];

await record.save();

return {
  success: true,
  message: 'Clocked out successfully!',
  data: {
    record,
    totalWorkMinutes: 0,
  },
};

  }
}
