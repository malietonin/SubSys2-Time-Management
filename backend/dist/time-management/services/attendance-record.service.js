"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRecordService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_record_schema_1 = require("../models/attendance-record.schema");
const index_1 = require("../models/enums/index");
const employee_profile_service_1 = require("../../employee-profile/employee-profile.service");
const schedule_rule_schema_1 = require("../models/schedule-rule.schema");
const shift_assignment_schema_1 = require("../models/shift-assignment.schema");
const lateness_rule_service_1 = require("./lateness-rule.service");
const holiday_service_1 = require("./holiday.service");
let AttendanceRecordService = class AttendanceRecordService {
    attendanceModel;
    employeeProfileService;
    scheduleRuleModel;
    shiftAssignmentModel;
    latenessRuleService;
    holidayService;
    constructor(attendanceModel, employeeProfileService, scheduleRuleModel, shiftAssignmentModel, latenessRuleService, holidayService) {
        this.attendanceModel = attendanceModel;
        this.employeeProfileService = employeeProfileService;
        this.scheduleRuleModel = scheduleRuleModel;
        this.shiftAssignmentModel = shiftAssignmentModel;
        this.latenessRuleService = latenessRuleService;
        this.holidayService = holidayService;
    }
    async createAttendanceRecord(dto) {
        if (!dto.employeeId) {
            throw new common_1.BadRequestException('Employee ID is required.');
        }
        const record = await this.attendanceModel.create(dto);
        return {
            success: true,
            message: 'Attendance record created successfully!',
            data: record,
        };
    }
    async updateAttendanceRecord(id, dto) {
        const record = await this.attendanceModel.findById(id);
        if (!record)
            throw new common_1.NotFoundException('Attendance record not found!');
        if (dto.employeeId !== undefined)
            record.employeeId = dto.employeeId;
        if (dto.punches !== undefined)
            record.punches = dto.punches;
        if (dto.totalWorkMinutes !== undefined)
            record.totalWorkMinutes = dto.totalWorkMinutes;
        if (dto.hasMissedPunch !== undefined)
            record.hasMissedPunch = dto.hasMissedPunch;
        if (dto.exceptionIds !== undefined)
            record.exceptionIds = dto.exceptionIds;
        if (dto.finalisedForPayroll !== undefined)
            record.finalisedForPayroll = dto.finalisedForPayroll;
        await record.save();
        return {
            success: true,
            message: 'Attendance record updated successfully!',
            data: record,
        };
    }
    async flagRepeatedLateness(employeeId) {
        const records = await this.attendanceModel.find({ employee: new mongoose_2.Types.ObjectId(employeeId) });
        if (!records.length)
            throw new common_1.NotFoundException('No attendance records found for this employee.');
        const repeated = await this.latenessRuleService.detectRepeatedLateness(employeeId);
        return {
            success: true,
            message: repeated ? 'Employee has repeated lateness.' : 'Employee lateness is within acceptable limits.',
            data: { repeated },
        };
    }
    async recordClockIn(dto) {
        if (dto.punchType !== index_1.PunchType.IN) {
            throw new common_1.BadRequestException('Punch type must be IN.');
        }
        const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found.');
        }
        let record = await this.attendanceModel.findOne({ employeeId: new mongoose_2.Types.ObjectId(dto.employeeId) });
        if (!record) {
            record = await this.attendanceModel.create({
                employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                punches: [],
                totalWorkMinutes: 0,
                hasMissedPunch: false,
            });
        }
        const scheduleRule = await this.scheduleRuleModel.findOne({ employeeId: dto.employeeId });
        if (!scheduleRule) {
            throw new common_1.NotFoundException('Schedule rule not found.');
        }
        const todayIndex = new Date().getDay();
        if (scheduleRule.pattern[todayIndex] === '0') {
            throw new common_1.BadRequestException('Cannot clock in on a rest day.');
        }
        const today = new Date();
        const isHoliday = await this.holidayService.getAllHolidays().then(holidays => holidays.data.some(holiday => {
            const holidayDate = new Date(holiday.startDate);
            return holidayDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
        }));
        if (isHoliday) {
            throw new common_1.BadRequestException('Cannot clock in on a holiday.');
        }
        const punch = { time: new Date(), type: dto.punchType };
        record.punches.push(punch);
        await record.save();
        return {
            success: true,
            message: 'Clocked in successfully!',
            data: record,
        };
    }
    async recordClockOut(dto) {
        if (dto.punchType !== index_1.PunchType.OUT) {
            throw new common_1.BadRequestException('Punch type must be OUT.');
        }
        const employee = await this.employeeProfileService.getMyProfile(dto.employeeId);
        if (!employee)
            throw new common_1.NotFoundException('Employee not found.');
        const record = await this.attendanceModel.findOne({ employeeId: new mongoose_2.Types.ObjectId(dto.employeeId) });
        if (!record)
            throw new common_1.NotFoundException('No attendance record found.');
        const scheduleRule = await this.scheduleRuleModel.findOne({ employeeId: dto.employeeId });
        if (!scheduleRule)
            throw new common_1.NotFoundException('Schedule rule not found.');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const hasClockedInToday = record.punches.some(p => p.type === index_1.PunchType.IN &&
            new Date(p.time).setHours(0, 0, 0, 0) === today.getTime());
        if (!hasClockedInToday)
            throw new common_1.BadRequestException('Cannot clock out without clocking in first.');
        const now = new Date();
        const punch = { time: now, type: dto.punchType };
        record.punches.push(punch);
        const todayPunches = record.punches.filter(p => new Date(p.time).setHours(0, 0, 0, 0) === today.getTime());
        let totalMinutes = 0;
        for (let i = 0; i < todayPunches.length; i++) {
            if (todayPunches[i].type === index_1.PunchType.IN) {
                const outPunch = todayPunches.slice(i + 1).find(p => p.type === index_1.PunchType.OUT);
                if (outPunch) {
                    totalMinutes += Math.floor((new Date(outPunch.time).getTime() - new Date(todayPunches[i].time).getTime()) / 60000);
                    i = todayPunches.indexOf(outPunch);
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
    async detectMissedPunches(employeeId) {
        const record = await this.attendanceModel.findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) });
        if (!record)
            throw new common_1.NotFoundException('No attendance record found.');
        record.hasMissedPunch = record.punches.some((p, i, arr) => {
            if (p.type === index_1.PunchType.IN) {
                const next = arr[i + 1];
                return !next || next.type !== index_1.PunchType.OUT;
            }
            return false;
        });
        await record.save();
        return { success: true, message: 'Missed punches detected', data: record };
    }
    async listAttendanceForEmployee(employeeId, startDate, endDate) {
        const employee = await this.employeeProfileService.getMyProfile(employeeId);
        if (!employee)
            throw new common_1.NotFoundException('Employee not found.');
        const record = await this.attendanceModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId)
        });
        if (!record) {
            return {
                success: true,
                message: 'No attendance punches found.',
                data: []
            };
        }
        if (!startDate && !endDate) {
            return {
                success: true,
                message: 'All attendance punches fetched.',
                data: record.punches
            };
        }
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        if (start)
            start.setHours(0, 0, 0, 0);
        if (end)
            end.setHours(23, 59, 59, 999);
        const filtered = record.punches.filter(p => {
            const t = new Date(p.time).getTime();
            if (start && end)
                return t >= start.getTime() && t <= end.getTime();
            if (start)
                return t >= start.getTime();
            if (end)
                return t <= end.getTime();
            return true;
        });
        return {
            success: true,
            message: 'Attendance punches fetched for the specified period.',
            data: filtered
        };
    }
    async updatePunchByTime(employeeId, punchTime, update) {
        const record = await this.attendanceModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId)
        });
        if (!record)
            throw new common_1.NotFoundException('Attendance record not found.');
        const target = record.punches.find(p => new Date(p.time).getTime() === new Date(punchTime).getTime());
        if (!target)
            throw new common_1.NotFoundException('Punch not found.');
        if (update.time)
            target.time = new Date(update.time);
        if (update.type)
            target.type = update.type;
        await record.save();
        return {
            success: true,
            message: 'Punch updated.',
            data: record
        };
    }
    async deletePunchByTime(employeeId, punchTime) {
        const record = await this.attendanceModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId)
        });
        if (!record)
            throw new common_1.NotFoundException('Attendance record not found.');
        const before = record.punches.length;
        record.punches = record.punches.filter(p => new Date(p.time).getTime() !== new Date(punchTime).getTime());
        const after = record.punches.length;
        if (before === after)
            throw new common_1.NotFoundException('Punch not found.');
        await record.save();
        return {
            success: true,
            message: 'Punch deleted.',
            data: record
        };
    }
    async deletePunchesForDate(employeeId, date) {
        const record = await this.attendanceModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId)
        });
        if (!record)
            throw new common_1.NotFoundException('Attendance record not found.');
        const day = new Date(date).setHours(0, 0, 0, 0);
        record.punches = record.punches.filter(p => {
            const t = new Date(p.time).setHours(0, 0, 0, 0);
            return t !== day;
        });
        await record.save();
        return {
            success: true,
            message: 'Punches for date deleted.',
            data: record
        };
    }
};
exports.AttendanceRecordService = AttendanceRecordService;
exports.AttendanceRecordService = AttendanceRecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(2, (0, mongoose_1.InjectModel)(schedule_rule_schema_1.ScheduleRule.name)),
    __param(3, (0, mongoose_1.InjectModel)(shift_assignment_schema_1.ShiftAssignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employee_profile_service_1.EmployeeProfileService,
        mongoose_2.Model,
        mongoose_2.Model,
        lateness_rule_service_1.LatenessRuleService,
        holiday_service_1.HolidayService])
], AttendanceRecordService);
//# sourceMappingURL=attendance-record.service.js.map