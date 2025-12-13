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
exports.TimeManagementController = void 0;
const notification_log_service_1 = require("./services/notification-log.service");
const common_1 = require("@nestjs/common");
const shift_assignment_service_1 = require("./services/shift-assignment.service");
const schedule_rule_service_1 = require("./services/schedule-rule.service");
const attendance_correction_request_service_1 = require("./services/attendance-correction-request.service");
const shift_assignment_create_dto_1 = require("./dtos/shift-assignment-create-dto");
const notification_log_create_dto_1 = require("./dtos/notification-log-create-dto");
const schedule_rule_create_dto_1 = require("./dtos/schedule-rule-create-dto");
const schedule_rule_update_dto_1 = require("./dtos/schedule-rule-update-dto");
const create_attendance_correction_request_dto_1 = require("./dtos/create-attendance-correction-request-dto");
const holiday_create_dto_1 = require("./dtos/holiday-create-dto");
const holiday_service_1 = require("./services/holiday.service");
const mongoose_1 = require("mongoose");
const shift_assignment_update_dto_1 = require("./dtos/shift-assignment-update-dto");
const shift_type_create_dto_1 = require("./dtos/shift-type-create-dto");
const shift_type_service_1 = require("./services/shift-type.service");
const enums_1 = require("./models/enums");
const shift_create_dto_1 = require("./dtos/shift-create-dto");
const shift_service_1 = require("./services/shift.service");
const time_exception_service_1 = require("./services/time-exception.service");
const overtime_rule_service_1 = require("./services/overtime-rule.service");
const lateness_rule_service_1 = require("./services/lateness-rule.service");
const create_time_exception_dto_1 = require("./dtos/create-time-exception.dto");
const overtime_rule_create_dto_1 = require("./dtos/overtime-rule-create.dto");
const overtime_rule_update_dto_1 = require("./dtos/overtime-rule-update.dto");
const lateness_rule_create_dto_1 = require("./dtos/lateness-rule-create.dto");
const lateness_rule_update_dto_1 = require("./dtos/lateness-rule-update.dto");
const attendance_record_service_1 = require("./services/attendance-record.service");
const create_attendance_record_dto_1 = require("./dtos/create-attendance-record-dto");
const attendance_record_dto_1 = require("./dtos/attendance-record-dto");
const update_attendance_record_dto_1 = require("./dtos/update-attendance-record-dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
let TimeManagementController = class TimeManagementController {
    shiftAssignmentService;
    notificationLogService;
    scheduleRuleService;
    attendanceCorrectionRequestService;
    holidayService;
    shiftTypeService;
    shiftService;
    timeExceptionService;
    overtimeRuleService;
    latenessRuleService;
    attendanceRecordService;
    constructor(shiftAssignmentService, notificationLogService, scheduleRuleService, attendanceCorrectionRequestService, holidayService, shiftTypeService, shiftService, timeExceptionService, overtimeRuleService, latenessRuleService, attendanceRecordService) {
        this.shiftAssignmentService = shiftAssignmentService;
        this.notificationLogService = notificationLogService;
        this.scheduleRuleService = scheduleRuleService;
        this.attendanceCorrectionRequestService = attendanceCorrectionRequestService;
        this.holidayService = holidayService;
        this.shiftTypeService = shiftTypeService;
        this.shiftService = shiftService;
        this.timeExceptionService = timeExceptionService;
        this.overtimeRuleService = overtimeRuleService;
        this.latenessRuleService = latenessRuleService;
        this.attendanceRecordService = attendanceRecordService;
    }
    async assignShift(assignData) {
        return await this.shiftAssignmentService.assignShift(assignData);
    }
    async getAllShiftAssignments() {
        return await this.shiftAssignmentService.getAllShiftAssignments();
    }
    async detectUpcomingExpiry() {
        return await this.shiftAssignmentService.detectUpcomingExpiry();
    }
    async getShiftAssignmentById(shiftAssignmentId) {
        return await this.shiftAssignmentService.getShiftAssignmentById(shiftAssignmentId);
    }
    async updateShiftAssignment(shiftAssignmentId, status) {
        return await this.shiftAssignmentService.updateShiftAssignment(status, shiftAssignmentId);
    }
    async extendShiftAssignment(shiftAssignmentId, dto) {
        return await this.shiftAssignmentService.extendShiftAssignment(dto, shiftAssignmentId);
    }
    async sendNotification(notifData) {
        return this.notificationLogService.sendNotification(notifData);
    }
    async getAllNotifications() {
        return this.notificationLogService.getAllNotifications();
    }
    async getNotificationbyId(notifId) {
        return this.notificationLogService.getNotificationById(notifId);
    }
    async getEmployeeNotifications(employeeId) {
        return this.notificationLogService.getEmployeeNotifications(employeeId);
    }
    async createScheduleRule(dto) {
        const createdRule = await this.scheduleRuleService.createScheduleRule(dto);
        return {
            success: true,
            message: 'Schedule rule created successfully!',
            data: createdRule
        };
    }
    async getAllScheduleRules() {
        const rules = await this.scheduleRuleService.getAllScheduleRules();
        return {
            success: true,
            data: rules
        };
    }
    async getScheduleRuleById(id) {
        const rule = await this.scheduleRuleService.getScheduleRuleById(new mongoose_1.Types.ObjectId(id));
        return {
            success: true,
            data: rule
        };
    }
    async updateScheduleRule(id, dto) {
        const updatedRule = await this.scheduleRuleService.updateScheduleRule(new mongoose_1.Types.ObjectId(id), dto);
        return {
            success: true,
            message: 'Schedule rule updated successfully!',
            data: updatedRule
        };
    }
    async deleteScheduleRule(id) {
        const result = await this.scheduleRuleService.deleteScheduleRule(new mongoose_1.Types.ObjectId(id));
        return result;
    }
    async recordClockIn(dto) {
        return this.attendanceRecordService.recordClockIn(dto);
    }
    async recordClockOut(dto) {
        return this.attendanceRecordService.recordClockOut(dto);
    }
    async detectMissedPunches(employeeId) {
        return this.attendanceRecordService.detectMissedPunches(employeeId);
    }
    async listAttendanceForEmployee(employeeId, startDate, endDate) {
        return this.attendanceRecordService.listAttendanceForEmployee(employeeId, startDate, endDate);
    }
    async updatePunchByTime(employeeId, punchTime, update) {
        return this.attendanceRecordService.updatePunchByTime(employeeId, punchTime, update);
    }
    async deletePunchByTime(employeeId, punchTime) {
        return this.attendanceRecordService.deletePunchByTime(employeeId, punchTime);
    }
    async deletePunchesForDate(employeeId, date) {
        return this.attendanceRecordService.deletePunchesForDate(employeeId, date);
    }
    async createAttendanceRecord(dto) {
        return this.attendanceRecordService.createAttendanceRecord(dto);
    }
    async updateAttendanceRecord(id, dto) {
        return this.attendanceRecordService.updateAttendanceRecord(id, dto);
    }
    async flagRepeatedLateness(employeeId) {
        return this.attendanceRecordService.flagRepeatedLateness(employeeId);
    }
    async submitCorrectionRequest(dto) {
        const result = await this.attendanceCorrectionRequestService.submitCorrectionRequest(dto);
        return {
            success: true,
            message: 'Correction request submitted successfully!',
            data: result
        };
    }
    async updateCorrectionRequest(id, dto) {
        const result = await this.attendanceCorrectionRequestService.updateCorrectionRequest(id, dto);
        return {
            success: true,
            message: 'Correction request updated successfully!',
            data: result
        };
    }
    async approveCorrectionRequest(id) {
        const result = await this.attendanceCorrectionRequestService.approveCorrectionRequest(id);
        return {
            success: true,
            message: 'Correction request approved!',
            data: result
        };
    }
    async rejectCorrectionRequest(id, reason) {
        if (!reason)
            throw new common_1.BadRequestException('Rejection reason is required.');
        const result = await this.attendanceCorrectionRequestService.rejectCorrectionRequest(id, reason);
        return {
            success: true,
            message: 'Correction request rejected!',
            data: result
        };
    }
    async listEmployeeRequests(employeeId) {
        const result = await this.attendanceCorrectionRequestService.listEmployeeCorrectionRequests(employeeId);
        return {
            success: true,
            message: 'Employee correction requests fetched.',
            data: result
        };
    }
    async autoEscalate() {
        const result = await this.attendanceCorrectionRequestService.autoEscalatePendingCorrections();
        return {
            success: true,
            message: 'Pending correction requests auto-escalated.',
            data: result
        };
    }
    async createHoliday(dto) {
        const result = await this.holidayService.createHoliday(dto);
        return {
            success: true,
            message: 'Holiday created successfully!',
            data: result
        };
    }
    async getAllHolidays() {
        const result = await this.holidayService.getAllHolidays();
        return {
            success: true,
            message: 'Holidays fetched successfully!',
            data: result
        };
    }
    async createShiftType(shiftTypeData) {
        return this.shiftTypeService.createShiftType(shiftTypeData);
    }
    async getAllShiftTypes() {
        return this.shiftTypeService.getAllShiftTypes();
    }
    async getShiftTypeById(shiftTypeId) {
        return this.shiftTypeService.getShiftTypeById(shiftTypeId);
    }
    async deleteShiftType(shiftTypeId) {
        return this.shiftTypeService.deleteShiftType(shiftTypeId);
    }
    async createShift(shiftData) {
        return this.shiftService.createShift(shiftData);
    }
    async getAllShifts() {
        return this.shiftService.getAllShifts();
    }
    async getShiftById(shiftId) {
        return this.shiftService.getShiftById(shiftId);
    }
    async deactivateShift(shiftId) {
        return this.shiftService.deactivateShift(shiftId);
    }
    async activateShift(shiftId) {
        return this.shiftService.activateShit(shiftId);
    }
    async deleteShift(shiftId) {
        return this.shiftService.deleteShift(shiftId);
    }
    async createTimeException(dto) {
        return this.timeExceptionService.create(dto);
    }
    async approveTimeException(id, approvedBy) {
        return this.timeExceptionService.approve(id, approvedBy);
    }
    async rejectTimeException(id, rejectedBy, reason) {
        return this.timeExceptionService.reject(id, rejectedBy, reason);
    }
    async autoEscalateTimeExceptions() {
        return this.timeExceptionService.autoEscalatePending();
    }
    async createOvertimeRule(dto) {
        return this.overtimeRuleService.createOvertimeRule(dto);
    }
    async updateOvertimeRule(id, dto) {
        return this.overtimeRuleService.updateOvertimeRule(id, dto);
    }
    async deleteOvertimeRule(id) {
        return this.overtimeRuleService.deleteOvertimeRule(id);
    }
    async createLatenessRule(dto) {
        return this.latenessRuleService.createLatenessRule(dto);
    }
    async getAllLatenessRules() {
        return this.latenessRuleService.listLatenessRules();
    }
    async getLatenessRuleById(id) {
        return this.latenessRuleService.findById(id);
    }
    async updateLatenessRule(id, dto) {
        return this.latenessRuleService.updateLatenessRule(id, dto);
    }
    async deleteLatenessRule(id) {
        return this.latenessRuleService.deleteLatenessRule(id);
    }
};
exports.TimeManagementController = TimeManagementController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('assign-shift'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shift_assignment_create_dto_1.ShiftAssignmentCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "assignShift", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('assign-shift'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllShiftAssignments", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('assign-shift/expiring'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "detectUpcomingExpiry", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('assign-shift/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getShiftAssignmentById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Put)('assign-shift/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateShiftAssignment", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Put)('assign-shift/extend/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shift_assignment_update_dto_1.ShiftAssignmentUpdateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "extendShiftAssignment", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('notification-log'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_log_create_dto_1.NotificationLogCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "sendNotification", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('notification-log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllNotifications", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('notification-log/:notifId'),
    __param(0, (0, common_1.Param)('notifId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getNotificationbyId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('notification-log/employee/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getEmployeeNotifications", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('schedule-rule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_rule_create_dto_1.ScheduleRuleCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createScheduleRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Get)('schedule-rule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllScheduleRules", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Get)('schedule-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getScheduleRuleById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Patch)('schedule-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schedule_rule_update_dto_1.ScheduleRuleUpdateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateScheduleRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Delete)('schedule-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteScheduleRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Post)('attendance-record/clock-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_record_dto_1.CreateAttendancePunchDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "recordClockIn", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('attendance-record/clock-out'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_record_dto_1.CreateAttendancePunchDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "recordClockOut", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('attendance-record/:employeeId/missed-punches'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "detectMissedPunches", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    (0, common_1.Get)('attendance-record/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "listAttendanceForEmployee", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    (0, common_1.Patch)('attendance-record/:employeeId/punch'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)('punchTime')),
    __param(2, (0, common_1.Body)('update')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updatePunchByTime", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    (0, common_1.Delete)('attendance-record/:employeeId/punch'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)('punchTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deletePunchByTime", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    (0, common_1.Delete)('attendance-record/:employeeId/punches'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deletePunchesForDate", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    (0, common_1.Post)('attendance-record'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_record_dto_1.CreateAttendanceRecordDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createAttendanceRecord", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    (0, common_1.Patch)('attendance-record/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_record_dto_1.UpdateAttendanceRecordDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateAttendanceRecord", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Get)('attendance-record/:employeeId/repeated-lateness'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "flagRepeatedLateness", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Post)('attendance-correction-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_correction_request_dto_1.AttendanceCorrectionRequestDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "submitCorrectionRequest", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    (0, common_1.Patch)('attendance-correction-request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_attendance_correction_request_dto_1.UpdateAttendanceCorrectionRequestDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateCorrectionRequest", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Patch)('attendance-correction-request/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "approveCorrectionRequest", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Patch)('attendance-correction-request/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "rejectCorrectionRequest", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Get)('attendance-correction-request/employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "listEmployeeRequests", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('attendance-correction-request/auto-escalate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "autoEscalate", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Post)('holiday'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [holiday_create_dto_1.CreateHolidayDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createHoliday", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('holiday'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllHolidays", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    (0, common_1.Post)('shift-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shift_type_create_dto_1.ShiftTypeCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createShiftType", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    (0, common_1.Get)('shift-type'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllShiftTypes", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    (0, common_1.Get)('shift-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getShiftTypeById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Delete)('shift-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteShiftType", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('shift'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shift_create_dto_1.ShiftCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createShift", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('shift'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllShifts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Get)('shift/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getShiftById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Put)('shift/deactivate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deactivateShift", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Put)('shift/activate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "activateShift", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Delete)('shift/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteShift", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('time-exception'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_time_exception_dto_1.TimeExceptionCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createTimeException", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Patch)('time-exception/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('approvedBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "approveTimeException", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Patch)('time-exception/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rejectedBy')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "rejectTimeException", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.HR_ADMIN),
    (0, common_1.Post)('time-exception/auto-escalate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "autoEscalateTimeExceptions", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Post)('overtime-rule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [overtime_rule_create_dto_1.OvertimeRuleCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createOvertimeRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Patch)('overtime-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, overtime_rule_update_dto_1.OvertimeRuleUpdateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateOvertimeRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Delete)('overtime-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteOvertimeRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Post)('lateness-rule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lateness_rule_create_dto_1.LatenessRuleCreateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createLatenessRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    (0, common_1.Get)('lateness-rule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllLatenessRules", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    (0, common_1.Get)('lateness-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getLatenessRuleById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Patch)('lateness-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lateness_rule_update_dto_1.LatenessRuleUpdateDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "updateLatenessRule", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Delete)('lateness-rule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "deleteLatenessRule", null);
exports.TimeManagementController = TimeManagementController = __decorate([
    (0, common_1.Controller)('time-management'),
    __metadata("design:paramtypes", [shift_assignment_service_1.ShiftAssignmentService,
        notification_log_service_1.NotificationLogService,
        schedule_rule_service_1.ScheduleRuleService,
        attendance_correction_request_service_1.AttendanceCorrectionRequestService,
        holiday_service_1.HolidayService,
        shift_type_service_1.ShiftTypeService,
        shift_service_1.ShiftService,
        time_exception_service_1.TimeExceptionService,
        overtime_rule_service_1.OvertimeRuleService,
        lateness_rule_service_1.LatenessRuleService,
        attendance_record_service_1.AttendanceRecordService])
], TimeManagementController);
//# sourceMappingURL=time-management.controller.js.map