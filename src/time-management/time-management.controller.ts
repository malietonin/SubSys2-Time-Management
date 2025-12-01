import { NotificationLogService } from './services/notification-log.service';
import { Controller, Post, Body, Delete, Param, Get, Put, Patch, BadRequestException } from '@nestjs/common';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { ScheduleRuleService } from './services/schedule-rule.service';
import { AttendanceCorrectionRequestService } from './services/attendance-correction-request.service';
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';
import { ScheduleRuleCreateDto } from './dtos/schedule-rule-create-dto';
import { ScheduleRuleUpdateDto } from './dtos/schedule-rule-update-dto';
import { AttendanceCorrectionRequestDto, UpdateAttendanceCorrectionRequestDto } from './dtos/create-attendance-correction-request-dto';
import { CreateHolidayDto } from './dtos/holiday-create-dto';
import { HolidayService } from './services/holiday.service';
import { Types } from 'mongoose';
import { ShiftAssignmentUpdateDto } from './dtos/shift-assignment-update-dto';
import { ShiftTypeCreateDto } from './dtos/shift-type-create-dto';
import { ShiftTypeService } from './services/shift-type.service';
import { ShiftAssignmentStatus } from './models/enums';
import { ShiftCreateDto } from './dtos/shift-create-dto';
import { ShiftService } from './services/shift.service';
import { TimeExceptionService } from './services/time-exception.service';
import { OvertimeRuleService } from './services/overtime-rule.service';
import { LatenessRuleService } from './services/lateness-rule.service';
import { TimeExceptionCreateDto } from './dtos/create-time-exception.dto';
import { TimeExceptionUpdateDto } from './dtos/update-time-exception.dto';
import { OvertimeRuleCreateDto } from './dtos/overtime-rule-create.dto';
import { OvertimeRuleUpdateDto } from './dtos/overtime-rule-update.dto';
import { ApplyOvertimeDto } from './dtos/apply-overtime.dto';
import { LatenessRuleCreateDto } from './dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from './dtos/lateness-rule-update.dto';

@Controller('time-management')
export class TimeManagementController {
    constructor(
        private readonly shiftAssignmentService: ShiftAssignmentService,
        private readonly notificationLogService: NotificationLogService,
        private readonly scheduleRuleService: ScheduleRuleService,
        private readonly attendanceCorrectionRequestService: AttendanceCorrectionRequestService,
        private readonly holidayService: HolidayService,
        private shiftTypeService:ShiftTypeService,
        private shiftService: ShiftService,
        private timeExceptionService: TimeExceptionService,
        private overtimeRuleService: OvertimeRuleService,
        private latenessRuleService: LatenessRuleService,
    ){}

    // Shift Assignment Functions (DONE - Authorization)
    @Post('assign-shift') // HR / Admin
    async assignShift(@Body() assignData: ShiftAssignmentCreateDto) {
        return await this.shiftAssignmentService.assignShift(assignData);
    }

    @Get('assign-shift') // HR / Admin
    async getAllShiftAssignments(){
        return await this.shiftAssignmentService.getAllShiftAssignments() 
    }

    @Get('assign-shift/expiring') // HR / Admin
    async detectUpcomingExpiry(){
        return await this.shiftAssignmentService.detectUpcomingExpiry()
    }

    @Get('assign-shift/:id') // HR / Admin
    async getShiftAssignmentById(@Param('id')shiftAssignmentId:string){
        return await this.shiftAssignmentService.getShiftAssignmentById(shiftAssignmentId)
    }

    @Put('assign-shift/:id') // HR / Admin
    async updateShiftAssignment(@Param('id')shiftAssignmentId:string, @Body()status:ShiftAssignmentStatus){
        return await this.shiftAssignmentService.updateShiftAssignment(status,shiftAssignmentId)
    }

    @Put('assign-shift/extend/:id') // HR / Admin
    async extendShiftAssignment(@Param('id')shiftAssignmentId:string,@Body()dto:ShiftAssignmentUpdateDto){
        return await this.shiftAssignmentService.extendShiftAssignment(dto,shiftAssignmentId)
    }

    // Notification Log Functions
    @Post('notification-log') // HR / Admin / Payroll Officer
    async sendNotification(@Body()notifData:NotificationLogCreateDto){
        return this.notificationLogService.sendNotification(notifData);
    }

    @Get('notification-log') // HR / Admin / Payroll Officer
    async getAllNotifications(){
        return this.notificationLogService.getAllNotifications()
    }

    @Get('notification-log/:id') // HR / Admin / Payroll Officer
    async getEmployeeNotifications(@Param('id') employeeId:string){
        return this.notificationLogService.getEmployeeNotifications(employeeId)
    }

    // Schedule Rule Functions
    @Post('schedule-rule') // HR / Admin
    async createScheduleRule(@Body() dto: ScheduleRuleCreateDto) {
        const createdRule = await this.scheduleRuleService.createScheduleRule(dto);
        return {
            success: true,
            message: 'Schedule rule created successfully!',
            data: createdRule
        };
    }

    @Get('schedule-rule') // HR / Admin / Employees (read-only)
    async getAllScheduleRules() {
        const rules = await this.scheduleRuleService.getAllScheduleRules();
        return {
            success: true,
            data: rules
        };
    }

    @Get('schedule-rule/:id') // HR / Admin / Employees (read-only)
    async getScheduleRuleById(@Param('id') id: string) {
        const rule = await this.scheduleRuleService.getScheduleRuleById(new Types.ObjectId(id));
        return {
            success: true,
            data: rule
        };
    }

    @Patch('schedule-rule/:id') // HR / Admin
    async updateScheduleRule(@Param('id') id: string, @Body() dto: ScheduleRuleUpdateDto) {
        const updatedRule = await this.scheduleRuleService.updateScheduleRule(new Types.ObjectId(id), dto);
        return {
            success: true,
            message: 'Schedule rule updated successfully!',
            data: updatedRule
        };
    }

    @Delete('schedule-rule/:id') // HR / Admin
    async deleteScheduleRule(@Param('id') id: string) {
        const result = await this.scheduleRuleService.deleteScheduleRule(new Types.ObjectId(id));
        return result;
    }

    // Attendance Correction Request Functions
    @Post('attendance-correction-request') // Employee
    async submitCorrectionRequest(@Body() dto: AttendanceCorrectionRequestDto) {
        const result = await this.attendanceCorrectionRequestService.submitCorrectionRequest(dto);
        return {
            success: true,
            message: 'Correction request submitted successfully!',
            data: result
        };
    }

    @Patch('attendance-correction-request/:id') // HR / Admin
    async updateCorrectionRequest(@Param('id') id: string, @Body() dto: UpdateAttendanceCorrectionRequestDto) {
        const result = await this.attendanceCorrectionRequestService.updateCorrectionRequest(id, dto);
        return {
            success: true,
            message: 'Correction request updated successfully!',
            data: result
        };
    }

    @Patch('attendance-correction-request/:id/approve') // HR / Admin
    async approveCorrectionRequest(@Param('id') id: string) {
        const result = await this.attendanceCorrectionRequestService.approveCorrectionRequest(id);
        return {
            success: true,
            message: 'Correction request approved!',
            data: result
        };
    }

    @Patch('attendance-correction-request/:id/reject') // HR / Admin
    async rejectCorrectionRequest(@Param('id') id: string, @Body('reason') reason: string) {
        if (!reason) throw new BadRequestException('Rejection reason is required.');
        const result = await this.attendanceCorrectionRequestService.rejectCorrectionRequest(id, reason);
        return {
            success: true,
            message: 'Correction request rejected!',
            data: result
        };
    }

    @Get('attendance-correction-request/employee/:employeeId') // Employee
    async listEmployeeRequests(@Param('employeeId') employeeId: string) {
        const result = await this.attendanceCorrectionRequestService.listEmployeeCorrectionRequests(employeeId);
        return {
            success: true,
            message: 'Employee correction requests fetched.',
            data: result
        };
    }

    @Post('attendance-correction-request/auto-escalate') // HR / Admin
    async autoEscalate() {
        const result = await this.attendanceCorrectionRequestService.autoEscalatePendingCorrections();
        return {
            success: true,
            message: 'Pending correction requests auto-escalated.',
            data: result
        };
    }

    // Holiday Functions
    @Post('holiday') // HR / Admin
    async createHoliday(@Body() dto: CreateHolidayDto) {
        const result = await this.holidayService.createHoliday(dto);
        return {
            success: true,
            message: 'Holiday created successfully!',
            data: result
        };
    }

    @Get('holiday') // HR / Admin / Employees (read-only)
    async getAllHolidays() {
        const result = await this.holidayService.getAllHolidays();
        return {
            success: true,
            message: 'Holidays fetched successfully!',
            data: result
        };
    }

    // Shift Type Functions
    @Post('shift-type') // HR / Admin
    async createShiftType(@Body()shiftTypeData:ShiftTypeCreateDto){
        return this.shiftTypeService.createShiftType(shiftTypeData);
    }

    @Get('shift-type') // HR / Admin / Employees (read-only)
    async getAllShiftTypes(){
        return this.shiftTypeService.getAllShiftTypes();
    }

    @Get('shift-type/:id') // HR / Admin / Employees (read-only)
    async getShiftTypeById(@Param('id')shiftTypeId:string){
        return this.shiftTypeService.getShiftTypeById(shiftTypeId)
    }

    @Delete('shift-type/:id') // HR / Admin
    async deleteShiftType(@Param('id')shiftTypeId:string){
        return this.shiftTypeService.deleteShiftType(shiftTypeId)
    }

    // Shift Functions
    @Post('shift') // HR / Admin
    async createShift(@Body()shiftData:ShiftCreateDto){
        return this.shiftService.createShift(shiftData)
    }

    @Get('shift') // HR / Admin / Employees (read-only)
    async getAllShifts(){
        return this.shiftService.getAllShifts()
    }

    @Get('shift/:id') // HR / Admin / Employees (read-only)
    async getShiftById(@Param('id')shiftId:string){
        return this.shiftService.getShiftById(shiftId)
    }

    @Put('shift/deactivate/:id') // HR / Admin
    async deactivateShift(@Param('id')shiftId:string){
        return this.shiftService.deactivateShift(shiftId)
    }

    @Put('shift/activate/:id') // HR / Admin
    async activateShift(@Param('id')shiftId:string){
        return this.shiftService.activateShit(shiftId)
    }

    @Delete('shift/:id') // HR / Admin
    async deleteShift(@Param('id')shiftId:string){
        return this.shiftService.deleteShift(shiftId)
    }

    // Time Exception Functions
    @Patch('time-exception/:id/approve') // HR / Admin
    async approveTimeException(@Param('id') id: string, @Body('approvedBy') approvedBy: string) {
        return this.timeExceptionService.approve(id, approvedBy);
    }

    @Patch('time-exception/:id/reject') // HR / Admin
    async rejectTimeException(@Param('id') id: string, @Body('rejectedBy') rejectedBy: string, @Body('reason') reason: string) {
        return this.timeExceptionService.reject(id, rejectedBy, reason);
    }

    @Post('time-exception/auto-escalate') // HR / Admin
    async autoEscalateTimeExceptions() {
        return this.timeExceptionService.autoEscalatePending();
    }

    // Overtime Rule Functions
    @Post('overtime-rule') // HR / Admin / Payroll Officer
    async createOvertimeRule(@Body() dto: OvertimeRuleCreateDto) {
        return this.overtimeRuleService.createOvertimeRule(dto);
    }

    @Patch('overtime-rule/:id') // HR / Admin / Payroll Officer
    async updateOvertimeRule(@Param('id') id: string, @Body() dto: OvertimeRuleUpdateDto) {
        return this.overtimeRuleService.updateOvertimeRule(id, dto);
    }

    @Delete('overtime-rule/:id') // HR / Admin / Payroll Officer
    async deleteOvertimeRule(@Param('id') id: string) {
        return this.overtimeRuleService.deleteOvertimeRule(id);
    }

    // Lateness Rule Functions
    @Post('lateness-rule') // HR / Admin
    async createLatenessRule(@Body() dto: LatenessRuleCreateDto) {
        return this.latenessRuleService.createLatenessRule(dto);
    }

    @Get('lateness-rule') // HR / Admin / Employees (read-only)
    async getAllLatenessRules() {
        return this.latenessRuleService.listLatenessRules();
    }

    @Get('lateness-rule/:id') // HR / Admin / Employees (read-only)
    async getLatenessRuleById(@Param('id') id: string) {
        return this.latenessRuleService.findById(id);
    }

    @Patch('lateness-rule/:id') // HR / Admin
    async updateLatenessRule(@Param('id') id: string, @Body() dto: LatenessRuleUpdateDto) {
        return this.latenessRuleService.updateLatenessRule(id, dto);
    }

    @Delete('lateness-rule/:id') // HR / Admin
    async deleteLatenessRule(@Param('id') id: string) {
        return this.latenessRuleService.deleteLatenessRule(id);
    }
}
