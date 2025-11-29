import { LatenessRuleCreateDto } from './dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from './dtos/lateness-rule-update.dto';
import { LatenessRuleService } from './services/lateness-rule.service';
import { NotificationLogService } from './services/notification-log.service';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { ScheduleRuleService } from './services/schedule-rule.service';
import { BadRequestException, Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';
import { ScheduleRuleCreateDto } from './dtos/schedule-rule-create-dto';
import { ScheduleRuleUpdateDto } from './dtos/schedule-rule-update-dto';
 

import { Types } from 'mongoose';

@Controller('time-management')
export class TimeManagementController {
    constructor(
    private readonly shiftAssignmentService: ShiftAssignmentService,
    private readonly notificationLogService: NotificationLogService,
    private readonly scheduleRuleService: ScheduleRuleService,
    private readonly latenessRuleService: LatenessRuleService
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

    @Get('lateness-rule')
async listLatenessRules() {
  return {
    success: true,
    data: await this.latenessRuleService.listLatenessRules(),
  };
}
 @Get('lateness-rule/:id')
async getLatenessRuleById(@Param('id') id: string) {
  const found = await this.latenessRuleService.findById(id);

  if (!found) {
    throw new BadRequestException('Rule not found');
  }

  return { success: true, data: found };
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
 // Lateness Rule Functions
@Post('lateness-rule')
async createLatenessRule(@Body() dto: LatenessRuleCreateDto) {
    const result = await this.latenessRuleService.createLatenessRule(dto);
    return {
        success: true,
        message: 'Lateness rule created successfully!',
        data: result
    };
}

 
@Patch('lateness-rule/:id')
async updateLatenessRule(@Param('id') id: string, @Body() dto: LatenessRuleUpdateDto) {
    const result = await this.latenessRuleService.updateLatenessRule(id, dto);
    return {
        success: true,
        message: 'Lateness rule updated successfully!',
        data: result
    };
}

@Delete('lateness-rule/:id')
async deleteLatenessRule(@Param('id') id: string) {
    const result = await this.latenessRuleService.deleteLatenessRule(id);
    return {
        success: true,
        message: 'Lateness rule deleted successfully!',
        data: result
    };
}
@Post('lateness-rule/:id/apply')
async applyPenalty(
  @Param('id') id: string,
  @Body('actualMinutesLate') actualMinutesLate: number
) {
  return this.latenessRuleService.applyLatenessPenalty(actualMinutesLate, id);
}

@Get('lateness-rule/repeated/:employeeId')
async detectRepeated(
  @Param('employeeId') employeeId: string
) {
  return this.latenessRuleService.detectRepeatedLateness(employeeId);
}
// ===== OVERTIME RULES =====

@Post('overtime-rule')
async createOvertimeRule(@Body() dto: OvertimeRuleCreateDto) {
  return this.overtimeRuleService.createOvertimeRule(dto);
}

@Get('overtime-rule')
async listOvertimeRules() {
  return {
    success: true,
    data: await this.overtimeRuleService.listOvertimeRules(),
  };
}

@Get('overtime-rule/:id')
async getOvertimeRuleById(@Param('id') id: string) {
  const rule = await this.overtimeRuleService.findById(id);
  if (!rule) throw new BadRequestException('Rule not found');

  return { success: true, data: rule };
}

@Patch('overtime-rule/:id')
async updateOvertimeRule(
  @Param('id') id: string,
  @Body() dto: OvertimeRuleUpdateDto
) {
  return this.overtimeRuleService.updateOvertimeRule(id, dto);
}

@Delete('overtime-rule/:id')
async deleteOvertimeRule(@Param('id') id: string) {
  return this.overtimeRuleService.deleteOvertimeRule(id);
}

}
