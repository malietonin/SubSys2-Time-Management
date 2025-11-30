import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AttendanceRecord, AttendanceRecordDocument } from '../models/attendance-record.schema';
import { CreateAttendancePunchDto } from '../dtos/create-attendance-record-dto';
import { PunchType } from '../models/enums/index';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { ShiftAssignmentService } from './shift-assignment.service';
import { ShiftAssignment, ShiftAssignmentDocument } from '../models/shift-assignment.schema';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @InjectModel(AttendanceRecord.name)
    private attendanceModel: Model<AttendanceRecordDocument>,
    private employeeProfileService: EmployeeProfileService,
    @InjectModel(ShiftAssignment.name)
    private shiftAssignmentModel: Model <ShiftAssignmentDocument>
  ) {}

  
  async recordClockIn(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.IN) {
      throw new BadRequestException('Punch type must be IN.');
    }

    const now = new Date();
    let record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(dto.employeeId) });

    const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
    const shiftAssignment = await this.shiftAssignmentModel.findOne({ employeeId: dto.employeeId});
    if (!shiftAssignment) {
      throw new NotFoundException('Shift assignment not found for employee.');
    }

    // Check if today is a rest day based on shift assignment
    
    // Example: if today is rest day, throw error

    if (!record) {
      record = await this.attendanceModel.create({
        employeeId: new Types.ObjectId(dto.employeeId),
        punches: [{ type: PunchType.IN, time: now }],
      });
    } else {
      record.punches.push({ type: PunchType.IN, time: now });
      await record.save();
    }

    return { success: true, message: 'In recorded successfully', data: record };
  }

 
  async recordClockOut(dto: CreateAttendancePunchDto) {
    if (dto.punchType !== PunchType.OUT) {
      throw new BadRequestException('Punch type must be OUT.');
    }

    const now = new Date();
    const record = await this.attendanceModel.findOne({ employeeId: new Types.ObjectId(dto.employeeId) });
    if (!record) throw new NotFoundException('No attendance record found.');

    record.punches.push({ type: PunchType.OUT, time: now });

    // Compute totalWorkMinutes 
    const firstIn = record.punches.find(p => p.type === PunchType.IN)?.time;
    if (firstIn) {
      record.totalWorkMinutes = Math.floor((now.getTime() - firstIn.getTime()) / 60000);
    }

    await record.save();
    return { success: true, message: 'Out recorded successfully', data: record };
  }

  
  async listAttendanceForEmployee(dto: CreateAttendancePunchDto) {
    const query: any = { employeeId: new Types.ObjectId(dto.employeeId) };
    if (dto.startDate || dto.endDate) query['punches.time'] = {};
    if (dto.startDate) query['punches.time'].$gte = new Date(dto.startDate);
    if (dto.endDate) query['punches.time'].$lte = new Date(dto.endDate);

    const records = await this.attendanceModel.find(query);
    return { success: true, message: 'Attendance fetched', data: records };
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
