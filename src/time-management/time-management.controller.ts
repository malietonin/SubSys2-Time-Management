import { TimeExceptionService } from './services/time-exception.service';
import {Controller,Post,Body,Get,Param,Patch,Delete,BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { NotificationLogService } from './services/notification-log.service';
import { ScheduleRuleService } from './services/schedule-rule.service';
import { LatenessRuleService } from './services/lateness-rule.service';
import { OvertimeRuleService } from './services/overtime-rule.service';
 
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';
import { ScheduleRuleCreateDto } from './dtos/schedule-rule-create-dto';
import { ScheduleRuleUpdateDto } from './dtos/schedule-rule-update-dto';
import { LatenessRuleCreateDto } from './dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from './dtos/lateness-rule-update.dto';
import { ApplyOvertimeDto } from './dtos/apply-overtime.dto';
import { OvertimeRuleCreateDto } from './dtos/overtime-rule-create.dto';
import { OvertimeRuleUpdateDto } from './dtos/overtime-rule-update.dto';
import { TimeExceptionCreateDto } from './dtos/create-time-exception.dto';
import { TimeExceptionUpdateDto } from './dtos/update-time-exception.dto';

/* =====================================================================
   TIME MANAGEMENT CONTROLLER (MAIN)
===================================================================== */
@Controller('time-management')
export class TimeManagementController {
  constructor(
    private readonly shiftAssignmentService: ShiftAssignmentService,
    private readonly notificationLogService: NotificationLogService,
    private readonly scheduleRuleService: ScheduleRuleService,
    private readonly latenessRuleService: LatenessRuleService,
    private readonly overtimeRuleService: OvertimeRuleService,
    private readonly timeExceptionService: TimeExceptionService
  ) {}

  // SHIFT ASSIGNMENT
  @Post('assign-shift')
  async assignShift(@Body() dto: ShiftAssignmentCreateDto) {
    return {
      success: true,
      message: 'Shift assigned successfully!',
      data: await this.shiftAssignmentService.assignShift(dto),
    };
  }

  // NOTIFICATION
  @Post('notification')
  async sendNotification(@Body() dto: NotificationLogCreateDto) {
    return this.notificationLogService.sendNotification(dto);
  }

  // SCHEDULE RULES
  @Post('schedule-rule')
  async createScheduleRule(@Body() dto: ScheduleRuleCreateDto) {
    return {
      success: true,
      message: 'Schedule rule created successfully!',
      data: await this.scheduleRuleService.createScheduleRule(dto),
    };
  }

  @Patch('schedule-rule/:id')
  async updateScheduleRule(
    @Param('id') id: string,
    @Body() dto: ScheduleRuleUpdateDto,
  ) {
    return {
      success: true,
      message: 'Schedule rule updated successfully!',
      data: await this.scheduleRuleService.updateScheduleRule(
        new Types.ObjectId(id),
        dto,
      ),
    };
  }

  @Delete('schedule-rule/:id')
  async deleteScheduleRule(@Param('id') id: string) {
    return this.scheduleRuleService.deleteScheduleRule(
      new Types.ObjectId(id),
    );
  }

  // LATENESS RULES
  @Post('lateness-rule')
  async createLatenessRule(@Body() dto: LatenessRuleCreateDto) {
    return this.latenessRuleService.createLatenessRule(dto);
  }

  @Get('lateness-rule')
  async listLatenessRules() {
    return {
      success: true,
      data: await this.latenessRuleService.listLatenessRules(),
    };
  }

  @Get('lateness-rule/:id')
  async getLatenessRule(@Param('id') id: string) {
    const rule = await this.latenessRuleService.findById(id);
    if (!rule) throw new BadRequestException('Rule not found');
    return { success: true, data: rule };
  }

  @Patch('lateness-rule/:id')
  async updateLatenessRule(
    @Param('id') id: string,
    @Body() dto: LatenessRuleUpdateDto,
  ) {
    return this.latenessRuleService.updateLatenessRule(id, dto);
  }

  @Delete('lateness-rule/:id')
  async deleteLatenessRule(@Param('id') id: string) {
    return this.latenessRuleService.deleteLatenessRule(id);
  }

  @Post('lateness-rule/:id/apply')
  async applyPenalty(
    @Param('id') id: string,
    @Body('actualMinutesLate') minutes: number,
  ) {
    return this.latenessRuleService.applyLatenessPenalty(minutes, id);
  }

  @Get('lateness-rule/repeated/:employeeId')
  async detectRepeated(@Param('employeeId') employeeId: string) {
    return this.latenessRuleService.detectRepeatedLateness(employeeId);
  }

  // OVERTIME RULES
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
  async getOvertimeRule(@Param('id') id: string) {
    const rule = await this.overtimeRuleService.findById(id);
    if (!rule) throw new BadRequestException('Rule not found');
    return { success: true, data: rule };
  }

  @Patch('overtime-rule/:id')
  async updateOvertimeRule(
    @Param('id') id: string,
    @Body() dto: OvertimeRuleUpdateDto,
  ) {
    return this.overtimeRuleService.updateOvertimeRule(id, dto);
  }

  @Delete('overtime-rule/:id')
  async deleteOvertimeRule(@Param('id') id: string) {
    return this.overtimeRuleService.deleteOvertimeRule(id);
  }

  @Post('overtime-rule/apply')
  async applyOvertime(@Body() dto: ApplyOvertimeDto) {
    return this.overtimeRuleService.applyOvertimeCalculation(dto);
  }
}

/* =====================================================================
   TIME EXCEPTION CONTROLLER (SEPARATE ROUTE)
===================================================================== */
@Controller('time-exception')
export class TimeExceptionController {
  constructor(
    private readonly timeExceptionService: TimeExceptionService
  ) {}

 
  @Post()
  create(@Body() dto: TimeExceptionCreateDto) {
    return this.timeExceptionService.create(dto);
  }

  @Get()
  list() {
    return this.timeExceptionService.listAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: TimeExceptionUpdateDto) {
    return this.timeExceptionService.update(id, dto);
  }

  @Patch(':id/approve')
  approve(
    @Param('id') id: string,
    @Body('approvedBy') approvedBy: string,
  ) {
    return this.timeExceptionService.approve(id, approvedBy);
  }

  @Patch(':id/reject')
  reject(
    @Param('id') id: string,
    @Body('rejectedBy') rejectedBy: string,
    @Body('reason') reason: string,
  ) {
    return this.timeExceptionService.reject(id, rejectedBy, reason);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.timeExceptionService.delete(id);
  }
   @Patch(':id/force-pending')
forcePending(@Param('id') id: string) {
  return this.timeExceptionService.forcePending(id);
}
 
@Patch(':id/escalate')
escalate(@Param('id') id: string) {
  return this.timeExceptionService.escalate(id);
}

}
