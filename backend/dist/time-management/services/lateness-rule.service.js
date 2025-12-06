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
exports.LatenessRuleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lateness_rule_schema_1 = require("../models/lateness-rule.schema");
const shift_schema_1 = require("../models/shift.schema");
const shift_assignment_schema_1 = require("../models/shift-assignment.schema");
const attendance_record_schema_1 = require("../../time-management/models/attendance-record.schema");
const schedule_rule_schema_1 = require("../../time-management/models/schedule-rule.schema");
let LatenessRuleService = class LatenessRuleService {
    latenessRuleModel;
    attendanceRecordModel;
    scheduleRuleModel;
    shiftModel;
    shiftAssignmentModel;
    constructor(latenessRuleModel, attendanceRecordModel, scheduleRuleModel, shiftModel, shiftAssignmentModel) {
        this.latenessRuleModel = latenessRuleModel;
        this.attendanceRecordModel = attendanceRecordModel;
        this.scheduleRuleModel = scheduleRuleModel;
        this.shiftModel = shiftModel;
        this.shiftAssignmentModel = shiftAssignmentModel;
    }
    async createLatenessRule(dto) {
        const created = await this.latenessRuleModel.create(dto);
        return {
            success: true,
            message: 'Lateness rule created successfully',
            data: created,
        };
    }
    async listLatenessRules() {
        return this.latenessRuleModel.find();
    }
    async updateLatenessRule(id, dto) {
        const updated = await this.latenessRuleModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Lateness rule not found');
        return {
            success: true,
            message: 'Lateness rule updated successfully',
            data: updated,
        };
    }
    async deleteLatenessRule(id) {
        const deleted = await this.latenessRuleModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Lateness rule not found');
        return {
            success: true,
            message: 'Lateness rule deleted successfully',
        };
    }
    async findById(id) {
        return this.latenessRuleModel.findById(id);
    }
    async getActiveRule() {
        const rule = await this.latenessRuleModel.findOne({ active: true });
        if (!rule)
            throw new common_1.NotFoundException('No active lateness rule set.');
        return rule;
    }
    async applyLatenessPenalty(actualMinutesLate, ruleId) {
        const rule = await this.latenessRuleModel.findById(ruleId);
        if (!rule)
            throw new common_1.NotFoundException('Lateness rule not found');
        const finalMinutes = Math.max(actualMinutesLate - rule.gracePeriodMinutes, 0);
        const penalty = Math.round(finalMinutes * rule.deductionForEachMinute);
        return {
            success: true,
            ruleUsed: rule.name,
            effectiveLateMinutes: finalMinutes,
            calculatedPenalty: penalty,
        };
    }
    async detectRepeatedLateness(employeeId) {
        const records = await this.attendanceRecordModel.find({
            employeeId: new mongoose_2.Types.ObjectId(employeeId)
        });
        if (!records.length) {
            return {
                success: true,
                message: 'No attendance records found',
                repeatedLateness: 0
            };
        }
        const shiftAssignments = await this.shiftAssignmentModel.find({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            $or: [
                { endDate: { $exists: false } },
                { endDate: null },
                { endDate: { $gte: new Date(0) } }
            ]
        }).lean();
        if (!shiftAssignments || shiftAssignments.length === 0) {
            return {
                success: true,
                message: 'No shift assignments found for employee; cannot compute lateness',
                repeatedLateness: 0
            };
        }
        let latenessCount = 0;
        const assignmentForDate = (date) => {
            return shiftAssignments.find(a => {
                const start = new Date(a.startDate);
                const end = a.endDate ? new Date(a.endDate) : null;
                return date >= start && (!end || date <= end);
            }) || shiftAssignments[0];
        };
        for (const record of records) {
            const firstIn = (record.punches ?? []).find(p => p.type === 'IN');
            if (!firstIn)
                continue;
            const actual = new Date(firstIn.time);
            const assignment = assignmentForDate(actual);
            if (!assignment || !assignment.shiftId)
                continue;
            const shift = await this.shiftModel.findById(assignment.shiftId).lean();
            if (!shift || !shift.startTime)
                continue;
            const [hourStr, minStr] = shift.startTime.split(':');
            const expected = new Date(actual);
            expected.setHours(Number(hourStr), Number(minStr), 0, 0);
            const diffMinutes = Math.floor((actual.getTime() - expected.getTime()) / 60000);
            if (diffMinutes > 0)
                latenessCount++;
        }
        const isRepeated = latenessCount >= 3;
        return {
            success: true,
            repeatedLateness: latenessCount,
            isRepeated,
            action: isRepeated ? 'Escalate to HR for disciplinary action' : 'No escalation required'
        };
    }
};
exports.LatenessRuleService = LatenessRuleService;
exports.LatenessRuleService = LatenessRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lateness_rule_schema_1.LatenessRule.name)),
    __param(1, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(2, (0, mongoose_1.InjectModel)(schedule_rule_schema_1.ScheduleRule.name)),
    __param(3, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __param(4, (0, mongoose_1.InjectModel)(shift_assignment_schema_1.ShiftAssignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LatenessRuleService);
//# sourceMappingURL=lateness-rule.service.js.map