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
import { Holiday, HolidayDocument } from '../models/holiday.schema';
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
    private leavesService: LeavesService // Added LeavesService dependency
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
    const records = await this.attendanceModel.find({ 
      employeeId: new Types.ObjectId(employeeId) 
    });
    
    if (!records.length) {
      throw new NotFoundException('No attendance records found for this employee.');
    }

    const repeated = await this.latenessRuleService.detectRepeatedLateness(employeeId);

    return {
      success: true,
      message: repeated ? 'Employee has repeated lateness.' : 'Employee lateness is within acceptable limits.',
      data: { repeated },
    };
  }

  async recordClockIn(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.IN) {
      throw new BadRequestException('Punch type must be IN.');
    }

    // Verify employee exists
    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    // Get today's date at midnight for consistent comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create today's attendance record
    let record = await this.attendanceModel.findOne({ 
      employeeId: new Types.ObjectId(dto.employeeId),
      'punches.0.time': {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!record) {
      record = await this.attendanceModel.create({
        employeeId: new Types.ObjectId(dto.employeeId),
        punches: [],
        totalWorkMinutes: 0,
        hasMissedPunch: false,
      });
    }

    // Check schedule rule
    const scheduleRule = await this.scheduleRuleModel.findOne({ 
      employeeId: dto.employeeId 
    });
    
    if (!scheduleRule) {
      throw new NotFoundException('Schedule rule not found.');
    }

    // Check if today is a rest day (0 = rest day in pattern)
    const todayIndex = new Date().getDay();
    if (scheduleRule.pattern[todayIndex] === '0') {
      throw new BadRequestException('Cannot clock in on a rest day.');
    }

    // Check if today is a holiday
    const isHoliday = await this.checkIfHoliday(today);
    if (isHoliday) {
      throw new BadRequestException('Cannot clock in on a holiday.');
    }

    // Check if already clocked in today without clocking out
    const todayPunches = record.punches.filter(p => {
      const punchDate = new Date(p.time);
      punchDate.setHours(0, 0, 0, 0);
      return punchDate.getTime() === today.getTime();
    });

    const lastPunch = todayPunches[todayPunches.length - 1];
    if (lastPunch && lastPunch.type === PunchType.IN) {
      throw new BadRequestException('Already clocked in. Please clock out first.');
    }

    // Add clock in punch
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

    const record = await this.attendanceModel.findOne({ 
      employeeId: new Types.ObjectId(dto.employeeId) 
    });
    
    if (!record) {
      throw new NotFoundException('No attendance record found.');
    }

    const scheduleRule = await this.scheduleRuleModel.findOne({ 
      employeeId: dto.employeeId 
    });
    
    if (!scheduleRule) {
      throw new NotFoundException('Schedule rule not found.');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if clocked in today
    const todayPunches = record.punches.filter(p => {
      const punchDate = new Date(p.time);
      punchDate.setHours(0, 0, 0, 0);
      return punchDate.getTime() === today.getTime();
    });

    const hasClockedInToday = todayPunches.some(p => p.type === PunchType.IN);
    if (!hasClockedInToday) {
      throw new BadRequestException('Cannot clock out without clocking in first.');
    }

    const lastPunch = todayPunches[todayPunches.length - 1];
    if (lastPunch && lastPunch.type === PunchType.OUT) {
      throw new BadRequestException('Already clocked out. Please clock in first.');
    }

    // Add clock out punch
    const now = new Date();
    const punch: Punch = { time: now, type: dto.punchType };
    record.punches.push(punch);

    // Recalculate total work minutes for today
    const updatedTodayPunches = [...todayPunches, punch];
    let totalMinutes = 0;

    for (let i = 0; i < updatedTodayPunches.length; i++) {
      if (updatedTodayPunches[i].type === PunchType.IN) {
        const outPunch = updatedTodayPunches.slice(i + 1).find(p => p.type === PunchType.OUT);
        if (outPunch) {
          const inTime = new Date(updatedTodayPunches[i].time).getTime();
          const outTime = new Date(outPunch.time).getTime();
          totalMinutes += Math.floor((outTime - inTime) / 60000);
        }
      }
    }

    record.totalWorkMinutes = totalMinutes;
    await record.save();

    return {
      success: true,
      message: 'Clocked out successfully!',
      data: record,
    };
  }

  async detectMissedPunches(employeeId: string) {
    const record = await this.attendanceModel.findOne({ 
      employeeId: new Types.ObjectId(employeeId) 
    });
    
    if (!record) {
      throw new NotFoundException('No attendance record found.');
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    // Check if today is a holiday
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isHoliday = await this.holidayService.getAllHolidays().then(holidays =>
      holidays.data.some(holiday => {
        const holidayDate = new Date(holiday.startDate);
        return holidayDate.setHours(0, 0, 0, 0) === today.getTime();
      })
    );

    if (isHoliday) {
      return { success: true, message: 'Today is a holiday. No missed punches flagged.', data: record };
    }

    // Check if the employee is on leave
    const isOnLeave = await this.leavesService.getAllLeaveRequests().then(leaves =>
      leaves.some(leave => {
        const leaveStart = new Date(leave.dates.from).setHours(0, 0, 0, 0);
        const leaveEnd = new Date(leave.dates.to).setHours(0, 0, 0, 0);
        return leave.employeeId.toString() === employeeId && today.getTime() >= leaveStart && today.getTime() <= leaveEnd;
      })
    );

    if (isOnLeave) {
      return { success: true, message: 'Employee is on leave. No missed punches flagged.', data: record };
    }

    record.hasMissedPunch = record.punches.some((p, i, arr) => {
      if (p.type === PunchType.IN) {
        const next = arr[i + 1];
        return !next || next.type !== PunchType.OUT;
      }
      return false;
    });

    await record.save();
    
    return { 
      success: true, 
      message: 'Missed punches detected', 
      data: record 
    };
  }

  async listAttendanceForEmployee(
    employeeId: string,
    startDate?: string,
    endDate?: string
  ) {
    const employee = await this.employeeProfileService.getMyProfile(employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(employeeId)
    });

    if (!record) {
      return {
        success: true,
        message: 'No attendance punches found.',
        data: []
      };
    }

    // If no date filters, return all punches
    if (!startDate && !endDate) {
  
    
    let start: Date | null = null;
    if (startDate) {
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
    }

    let end: Date | null = null;
    if (endDate) {
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    }

    const punchesWithShifts = await Promise.all(record.punches.map(async (punch) => {
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
        shiftName: shiftAssignment && shiftAssignment.shiftId ? (shiftAssignment.shiftId as any).name : 'N/A',
      };
    }

    // Filter punches by date range
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    const filtered = record.punches.filter(p => {
      const t = new Date(p.time).getTime();

      if (start && end) {
        return t >= start.getTime() && t <= end.getTime();
      }

      if (start) {
        return t >= start.getTime();
      }

      if (end) {
        return t <= end.getTime();
      }

      return true;
    }));

    const filtered = punchesWithShifts.filter(p => {
      const punchTime = new Date(p.time);
      const isAfterStart = !start || punchTime.getTime() >= start.getTime();
      const isBeforeEnd = !end || punchTime.getTime() <= end.getTime();
      return isAfterStart && isBeforeEnd;
    });

    return {
      success: true,
      message: 'Attendance punches fetched.',
      data: filtered
    };
  }

  async getAllAttendanceRecords(
    startDate?: string,
    endDate?: string,
    employeeId?: string
  ) {
    const query: any = {};

    if (employeeId) {
      query.employeeId = new Types.ObjectId(employeeId);
    }

    // Build date filter for punches
    if (startDate || endDate) {
      const dateFilter: any = {};
      
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        dateFilter.$gte = start;
      }
      
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.$lte = end;
      }

      query['punches.time'] = dateFilter;
    }

    const records = await this.attendanceModel
      .find(query)
      .populate('employeeId', 'firstName lastName email')
      .sort({ 'punches.time': -1 });

    return {
      success: true,
      message: 'Attendance records fetched.',
      data: records
    };
  }

  async getAttendanceRecordById(id: string) {
    const record = await this.attendanceModel
      .findById(id)
      .populate('employeeId', 'firstName lastName email');

    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    return {
      success: true,
      data: record
    };
  }

  async deleteAttendanceRecord(id: string) {
    const record = await this.attendanceModel.findByIdAndDelete(id);

    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    return {
      success: true,
      message: 'Attendance record deleted successfully.'
    };
  }

  async updatePunchByTime(
    employeeId: string,
    punchTime: string,
    update: { time?: string; type?: 'IN' | 'OUT' }
  ) {
    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(employeeId)
    });

    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    const targetTime = new Date(punchTime).getTime();
    const target = record.punches.find(
      p => new Date(p.time).getTime() === targetTime
    );

    if (!target) {
      throw new NotFoundException('Punch not found.');
    }

    if (update.time) target.time = new Date(update.time);
    if (update.type) target.type = update.type as PunchType;

    await record.save();

    return {
      success: true,
      message: 'Punch updated successfully.',
      data: record
    };
  }

  async deletePunchByTime(employeeId: string, punchTime: string) {
    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(employeeId)
    });

    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    const before = record.punches.length;
    const targetTime = new Date(punchTime).getTime();

    record.punches = record.punches.filter(
      p => new Date(p.time).getTime() !== targetTime
    );

    const after = record.punches.length;

    if (before === after) {
      throw new NotFoundException('Punch not found.');
    }

    await record.save();

    return {
      success: true,
      message: 'Punch deleted successfully.',
      data: record
    };
  }

  async deletePunchesForDate(employeeId: string, date: string) {
    const record = await this.attendanceModel.findOne({
      employeeId: new Types.ObjectId(employeeId)
    });

    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const dayTimestamp = targetDate.getTime();

    record.punches = record.punches.filter(p => {
      const punchDate = new Date(p.time);
      punchDate.setHours(0, 0, 0, 0);
      return punchDate.getTime() !== dayTimestamp;
    });

    await record.save();

    return {
      success: true,
      message: 'Punches for date deleted successfully.',
      data: record
    };
  }

  // Helper method to check if a date is a holiday
  private async checkIfHoliday(date: Date): Promise<boolean> {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const timestamp = checkDate.getTime();

    const holidays = await this.holidayService.getAllHolidays();
    
    return holidays.data.some(holiday => {
      const startDate = new Date(holiday.startDate);
      startDate.setHours(0, 0, 0, 0);
      const startTimestamp = startDate.getTime();

      const endDate = new Date(holiday.endDate || holiday.startDate);
      endDate.setHours(23, 59, 59, 999);
      const endTimestamp = endDate.getTime();

      return timestamp >= startTimestamp && timestamp <= endTimestamp;
    });
  }
}