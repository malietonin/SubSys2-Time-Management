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
    private leavesService: LeavesService
  ) {}

  async createAttendanceRecord(dto: CreateAttendanceRecordDto) {
    if (!dto.employeeId) throw new BadRequestException('Employee ID is required.');

    const record = await this.attendanceModel.create(dto);
    return { success: true, message: 'Attendance record created successfully!', data: record };
  }

  async updateAttendanceRecord(id: string, dto: UpdateAttendanceRecordDto) {
    const record = await this.attendanceModel.findById(id);
    if (!record) throw new NotFoundException('Attendance record not found!');

    Object.assign(record, dto);
    await record.save();

    return { success: true, message: 'Attendance record updated successfully!', data: record };
  }

  async flagRepeatedLateness(employeeId: string) {
    const records = await this.attendanceModel.find({ employeeId: new Types.ObjectId(employeeId) });
    if (!records.length) throw new NotFoundException('No attendance records found for this employee.');

    const repeated = await this.latenessRuleService.detectRepeatedLateness(employeeId);
    return {
      success: true,
      message: repeated ? 'Employee has repeated lateness.' : 'Employee lateness is within acceptable limits.',
      data: { repeated },
    };
  }

  async recordClockIn(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.IN) throw new BadRequestException('Punch type must be IN.');
    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) throw new NotFoundException('Employee not found.');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(dto.employeeId),
      'punches.time': { $gte: today, $lt: new Date(today.getTime() + 86400000) },
    });

    if (!record) {
      record = await this.attendanceModel.create({
        employeeId: new Types.ObjectId(dto.employeeId),
        punches: [],
        totalWorkMinutes: 0,
        hasMissedPunch: false,
      });
    }

    const scheduleRule = await this.scheduleRuleModel.findOne({ employeeId: dto.employeeId });
    if (!scheduleRule) throw new NotFoundException('Schedule rule not found.');
    const todayIndex = new Date().getDay();
    if (scheduleRule.pattern[todayIndex] === '0') throw new BadRequestException('Cannot clock in on a rest day.');

    const isHoliday = await this.checkIfHoliday(today);
    if (isHoliday) throw new BadRequestException('Cannot clock in on a holiday.');

    const lastPunch = record.punches[record.punches.length - 1];
    if (lastPunch?.type === PunchType.IN) throw new BadRequestException('Already clocked in. Please clock out first.');

    record.punches.push({ time: new Date(), type: PunchType.IN });
    await record.save();

    return { success: true, message: 'Clocked in successfully!', data: record };
  }

  async recordClockOut(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.OUT) throw new BadRequestException('Punch type must be OUT.');
    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) throw new NotFoundException('Employee not found.');

    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(dto.employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayPunches = record.punches.filter(p => {
      const punchDate = new Date(p.time);
      punchDate.setHours(0, 0, 0, 0);
      return punchDate.getTime() === today.getTime();
    });

    if (!todayPunches.some(p => p.type === PunchType.IN))
      throw new BadRequestException('Cannot clock out without clocking in first.');

    const lastPunch = todayPunches[todayPunches.length - 1];
    if (lastPunch?.type === PunchType.OUT) throw new BadRequestException('Already clocked out. Please clock in first.');

    const now = new Date();
    record.punches.push({ time: now, type: PunchType.OUT });

    // Recalculate total work minutes for today
    const inOutPairs: [Punch, Punch][] = [];
    let tempIn: Punch | null = null;
    for (const p of record.punches) {
      if (p.type === PunchType.IN) tempIn = p;
      if (p.type === PunchType.OUT && tempIn) {
        inOutPairs.push([tempIn, p]);
        tempIn = null;
      }
    }
    record.totalWorkMinutes = inOutPairs.reduce((sum, [inP, outP]) => {
      return sum + Math.floor((new Date(outP.time).getTime() - new Date(inP.time).getTime()) / 60000);
    }, 0);

    await record.save();
    return { success: true, message: 'Clocked out successfully!', data: record };
  }

  async detectMissedPunches(employeeId: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const holidays = await this.holidayService.getAllHolidays();
    const isHoliday = holidays.data.some(h => {
      const start = new Date(h.startDate).setHours(0, 0, 0, 0);
      const end = new Date(h.endDate || h.startDate).setHours(23, 59, 59, 999);
      return today.getTime() >= start && today.getTime() <= end;
    });
    if (isHoliday) return { success: true, message: 'Today is a holiday. No missed punches flagged.', data: record };

    const leaves = await this.leavesService.getAllLeaveRequests();
    const isOnLeave = leaves.some(l => {
      const from = new Date(l.dates.from).setHours(0, 0, 0, 0);
      const to = new Date(l.dates.to).setHours(23, 59, 59, 999);
      return l.employeeId.toString() === employeeId && today.getTime() >= from && today.getTime() <= to;
    });
    if (isOnLeave) return { success: true, message: 'Employee is on leave. No missed punches flagged.', data: record };

    record.hasMissedPunch = record.punches.some((p, i, arr) => p.type === PunchType.IN && (!arr[i + 1] || arr[i + 1].type !== PunchType.OUT));
    await record.save();
    return { success: true, message: 'Missed punches detected', data: record };
  }

  async listAttendanceForEmployee(employeeId: string, startDate?: string, endDate?: string) {
    const employee = await this.employeeProfileService.getMyProfile(employeeId);
    if (!employee) throw new NotFoundException('Employee not found.');

    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) return { success: true, message: 'No attendance punches found.', data: [] };

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    const punchesWithShifts = await Promise.all(record.punches.map(async punch => {
      const punchTime = new Date(punch.time);
      const punchDate = new Date(punchTime);
      punchDate.setHours(0, 0, 0, 0);

      const shiftAssignment = await this.shiftAssignmentModel.findOne({
        employeeId: new Types.ObjectId(employeeId),
        date: punchDate,
      }).populate('shiftId');

      return {
        time: punch.time,
        type: punch.type,
        shiftName: shiftAssignment?.shiftId ? (shiftAssignment.shiftId as any).name : 'N/A',
      };
    }));

    const filtered = punchesWithShifts.filter(p => {
      const t = new Date(p.time).getTime();
      return (!start || t >= start.getTime()) && (!end || t <= end.getTime());
    });

    return { success: true, message: 'Attendance punches fetched.', data: filtered };
  }

  async getAllAttendanceRecords(startDate?: string, endDate?: string, employeeId?: string) {
    const query: any = {};
    if (employeeId) query.employeeId = new Types.ObjectId(employeeId);

    if (startDate || endDate) {
      const dateFilter: any = {};
      if (startDate) { const s = new Date(startDate); s.setHours(0, 0, 0, 0); dateFilter.$gte = s; }
      if (endDate) { const e = new Date(endDate); e.setHours(23, 59, 59, 999); dateFilter.$lte = e; }
      query['punches.time'] = dateFilter;
    }

    const records = await this.attendanceModel.find(query).populate('employeeId', 'firstName lastName email').sort({ 'punches.time': -1 });
    return { success: true, message: 'Attendance records fetched.', data: records };
  }

  async getAttendanceRecordById(id: string) {
    const record = await this.attendanceModel.findById(id).populate('employeeId', 'firstName lastName email');
    if (!record) throw new NotFoundException('Attendance record not found.');
    return { success: true, data: record };
  }

  async deleteAttendanceRecord(id: string) {
    const record = await this.attendanceModel.findByIdAndDelete(id);
    if (!record) throw new NotFoundException('Attendance record not found.');
    return { success: true, message: 'Attendance record deleted successfully.' };
  }

  async updatePunchByTime(employeeId: string, punchTime: string, update: { time?: string; type?: 'IN' | 'OUT' }) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('Attendance record not found.');

    const targetTime = new Date(punchTime).getTime();
    const target = record.punches.find(p => new Date(p.time).getTime() === targetTime);
    if (!target) throw new NotFoundException('Punch not found.');

    if (update.time) target.time = new Date(update.time);
    if (update.type) target.type = update.type as PunchType;

    await record.save();
    return { success: true, message: 'Punch updated successfully.', data: record };
  }

  async deletePunchByTime(employeeId: string, punchTime: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('Attendance record not found.');

    const before = record.punches.length;
    const targetTime = new Date(punchTime).getTime();
    record.punches = record.punches.filter(p => new Date(p.time).getTime() !== targetTime);

    if (before === record.punches.length) throw new NotFoundException('Punch not found.');
    await record.save();
    return { success: true, message: 'Punch deleted successfully.', data: record };
  }

  async deletePunchesForDate(employeeId: string, date: string) {
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('Attendance record not found.');

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    record.punches = record.punches.filter(p => new Date(p.time).setHours(0, 0, 0, 0) !== day.getTime());

    await record.save();
    return { success: true, message: 'Punches for date deleted successfully.', data: record };
  }

  private async checkIfHoliday(date: Date): Promise<boolean> {
    const timestamp = new Date(date).setHours(0, 0, 0, 0);
    const holidays = await this.holidayService.getAllHolidays();
    return holidays.data.some(h => {
      const start = new Date(h.startDate).setHours(0, 0, 0, 0);
      const end = new Date(h.endDate || h.startDate).setHours(23, 59, 59, 999);
      return timestamp >= start && timestamp <= end;
    });
  }
}
