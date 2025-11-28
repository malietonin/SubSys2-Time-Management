import { NotificationLogService } from './services/notification-log.service';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { ScheduleRuleService } from './services/schedule-rule.service';
import { AttendanceCorrectionRequestService } from './services/attendance-correction-request.service';
import { BadRequestException, Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';
import { ScheduleRuleCreateDto } from './dtos/schedule-rule-create-dto';
import { ScheduleRuleUpdateDto } from './dtos/schedule-rule-update-dto';
import { AttendanceCorrectionRequestDto, UpdateAttendanceCorrectionRequestDto } from './dtos/create-attendance-correction-request-dto';

import { Types } from 'mongoose';

@Controller('time-management')
export class TimeManagementController {
    constructor(
        private readonly shiftAssignmentService: ShiftAssignmentService,
        private readonly notificationLogService: NotificationLogService,
        private readonly scheduleRuleService: ScheduleRuleService,
        private readonly attendanceCorrectionRequestService: AttendanceCorrectionRequestService,
    ){}

    // Shift Assignment Functions
    @Post('assign-shift')
    async assignShift(@Body() assignData: ShiftAssignmentCreateDto) {
        const result = await this.shiftAssignmentService.assignShift(assignData);
        return {
            success: true,
            message: 'Shift assigned successfully!',
            data: result
        };
    }

    // Notification Log Functions
    @Post('notification')
    async sendNotification(@Body() notifData: NotificationLogCreateDto) {
        const result = await this.notificationLogService.sendNotification(notifData);
        return result;
    }

    // Schedule Rule Functions
    @Post('schedule-rule')
    async createScheduleRule(@Body() dto: ScheduleRuleCreateDto) {
        const createdRule = await this.scheduleRuleService.createScheduleRule(dto);
        return {
            success: true,
            message: 'Schedule rule created successfully!',
            data: createdRule
        };
    }

    @Get('schedule-rule')
    async getAllScheduleRules() {
        const rules = await this.scheduleRuleService.getAllScheduleRules();
        return {
            success: true,
            data: rules
        };
    }

    @Get('schedule-rule/:id')
    async getScheduleRuleById(@Param('id') id: string) {
        const rule = await this.scheduleRuleService.getScheduleRuleById(new Types.ObjectId(id));
        return {
            success: true,
            data: rule
        };
    }

    @Patch('schedule-rule/:id')
    async updateScheduleRule(@Param('id') id: string, @Body() dto: ScheduleRuleUpdateDto) {
        const updatedRule = await this.scheduleRuleService.updateScheduleRule(new Types.ObjectId(id), dto);
        return {
            success: true,
            message: 'Schedule rule updated successfully!',
            data: updatedRule
        };
    }

    @Delete('schedule-rule/:id')
    async deleteScheduleRule(@Param('id') id: string) {
        const result = await this.scheduleRuleService.deleteScheduleRule(new Types.ObjectId(id));
        return result;
    }

    // Attendance Correction Request Functions
    @Post('attendance-correction-request')
    async submitCorrectionRequest(
    @Body() dto: AttendanceCorrectionRequestDto
    ) {
    const result = await this.attendanceCorrectionRequestService.submitCorrectionRequest(dto);
    return {
        success: true,
        message: 'Correction request submitted successfully!',
        data: result
    };
    }


    @Patch('attendance-correction-request/:id')
    async updateCorrectionRequest(
    @Param('id') id: string,
    @Body() dto: UpdateAttendanceCorrectionRequestDto
    ) {
    const result = await this.attendanceCorrectionRequestService.updateCorrectionRequest(
        id, 
        dto
    );
    return {
        success: true,
        message: 'Correction request updated successfully!',
        data: result
    };
    }


    @Patch('attendance-correction-request/:id/approve')
    async approveCorrectionRequest(@Param('id') id: string) {
    const result = await this.attendanceCorrectionRequestService.approveCorrectionRequest(
        id 
    );
    return {
        success: true,
        message: 'Correction request approved!',
        data: result
    };
    }


    @Patch('attendance-correction-request/:id/reject')
    async rejectCorrectionRequest(
    @Param('id') id: string,
    @Body('reason') reason: string
    ) {
    if (!reason) throw new BadRequestException('Rejection reason is required.');
    const result = await this.attendanceCorrectionRequestService.rejectCorrectionRequest(
        id, 
        reason
    );
    return {
        success: true,
        message: 'Correction request rejected!',
        data: result
    };
    }
    }
