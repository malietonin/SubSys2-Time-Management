 import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AttendanceRecord, AttendanceRecordDocument, Punch } from '../models/attendance-record.schema';
import { CreateAttendancePunchDto } from '../dtos/create-attendance-record-dto';
import { PunchType } from '../models/enums';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { ScheduleRule, ScheduleRuleDocument } from '../models/schedule-rule.schema';
import { ShiftAssignment, ShiftAssignmentDocument } from '../models/shift-assignment.schema';
import { LatenessRuleService } from './lateness-rule.service';
import { CreateAttendanceRecordDto } from '../dtos/attendance-record-dto';
import { UpdateAttendanceRecordDto } from '../dtos/update-attendance-record-dto';
import { HolidayService } from './holiday.service';
import { Shift, ShiftDocument } from '../models/shift.schema';
import { LeavesService } from '../../leaves/leaves.service';

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
    @InjectModel(Shift.name)
    private shiftModel: Model<ShiftDocument>,
    private latenessRuleService: LatenessRuleService,
    private holidayService: HolidayService,
    private leavesService: LeavesService,
  ) {}

  // ---------------- CREATE / UPDATE RECORD ----------------

  async createAttendanceRecord(dto: CreateAttendanceRecordDto) {
    if (!dto.employeeId) throw new BadRequestException('Employee ID is required.');

    const record = await this.attendanceModel.create(dto);
    return { success: true, message: 'Attendance record created successfully!', data: record };
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
    return { success: true, message: 'Attendance record updated successfully!', data: record };
  }

  // ---------------- CLOCK IN ----------------

  async recordClockIn(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.IN)
      throw new BadRequestException('Punch type must be IN.');

    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) throw new NotFoundException('Employee not found.');

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

    // schedule rule fallback (as you requested)
    let scheduleRule = await this.scheduleRuleModel.findOne({
      employeeId: new Types.ObjectId(dto.employeeId),
    });

    if (!scheduleRule) {
      scheduleRule = {
        startTime: '09:00',
        endTime: '17:00',
        allowedLateMinutes: 15,
      } as any;
    }

    const punch: Punch = { time: new Date(), type: PunchType.IN };
    record.punches.push(punch);
    await record.save();

    return { success: true, message: 'Clocked in successfully!', data: record };
  }

  // ---------------- CLOCK OUT ----------------

  async recordClockOut(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.OUT)
      throw new BadRequestException('Punch type must be OUT.');

    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(dto.employeeId),
    });

    if (!record) throw new NotFoundException('Attendance record not found.');

    const lastPunch = record.punches[record.punches.length - 1];
    if (!lastPunch || lastPunch.type !== PunchType.IN)
      throw new BadRequestException('Cannot clock out without clocking in.');

    const outTime = new Date();
    record.punches.push({ type: PunchType.OUT, time: outTime });

    const diffMs = outTime.getTime() - new Date(lastPunch.time).getTime();
    const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
    record.totalWorkMinutes += diffMinutes;

    await record.save();

    return {
      success: true,
      message: 'Clocked out successfully!',
      totalMinutesToday: diffMinutes,
    };
  }

  // ---------------- MISSED PUNCHES ----------------

  async detectMissedPunches(employeeId: string) {
    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(employeeId),
    });
    if (!record) throw new NotFoundException('No attendance record found.');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isHoliday = await this.holidayService.getAllHolidays().then(res =>
      res.data.some(h => new Date(h.startDate).setHours(0,0,0,0) === today.getTime())
    );

    if (isHoliday)
      return { success: true, message: 'Today is a holiday.', data: record };

    const isOnLeave = await this.leavesService.getAllLeaveRequests().then(leaves =>
      leaves.some(l => {
        const from = new Date(l.dates.from).setHours(0,0,0,0);
        const to = new Date(l.dates.to).setHours(0,0,0,0);
        return l.employeeId.toString() === employeeId &&
               today.getTime() >= from &&
               today.getTime() <= to;
      })
    );

    if (isOnLeave)
      return { success: true, message: 'Employee is on leave.', data: record };

    record.hasMissedPunch = record.punches.some((p, i, arr) =>
      p.type === PunchType.IN && (!arr[i + 1] || arr[i + 1].type !== PunchType.OUT)
    );

    await record.save();
    return { success: true, message: 'Missed punches detected.', data: record };
  }

  // ---------------- LIST ----------------

  async listAttendanceForEmployee(employeeId: string, startDate?: string, endDate?: string) {
    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(employeeId),
    });

    if (!record)
      return { success: true, message: 'No attendance punches found.', data: [] };

    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;
    if (start) start.setHours(0,0,0,0);
    if (end) end.setHours(23,59,59,999);

    const data = record.punches.filter(p => {
      const t = new Date(p.time).getTime();
      return (!start || t >= start.getTime()) && (!end || t <= end.getTime());
    });

    return { success: true, message: 'Attendance punches fetched.', data };
  }

  // ---------------- UPDATE / DELETE ----------------

  async updatePunchByTime(employeeId: string, punchTime: string, update: { time?: string; type?: 'IN' | 'OUT' }) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('Attendance record not found.');

    const target = record.punches.find(p =>
      new Date(p.time).getTime() === new Date(punchTime).getTime()
    );

    if (!target) throw new NotFoundException('Punch not found.');

    if (update.time) target.time = new Date(update.time);
    if (update.type) target.type = update.type as PunchType;

    await record.save();
    return { success: true, message: 'Punch updated.', data: record };
  }

  async deletePunchByTime(employeeId: string, punchTime: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('Attendance record not found.');

    const before = record.punches.length;
    record.punches = record.punches.filter(
      p => new Date(p.time).getTime() !== new Date(punchTime).getTime()
    );

    if (before === record.punches.length)
      throw new NotFoundException('Punch not found.');

    await record.save();
    return { success: true, message: 'Punch deleted.', data: record };
  }

  async deletePunchesForDate(employeeId: string, date: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('Attendance record not found.');

    const day = new Date(date).setHours(0,0,0,0);
    record.punches = record.punches.filter(
      p => new Date(p.time).setHours(0,0,0,0) !== day
    );

    await record.save();
    return { success: true, message: 'Punches for date deleted.', data: record };
  }
}