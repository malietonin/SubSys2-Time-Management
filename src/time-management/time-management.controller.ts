import { NotificationLogService } from './services/notification-log.service';
import { BadRequestException, Controller, Post, Body } from '@nestjs/common';
import { Shift } from './models/shift.schema';
import { ShiftAssignment, ShiftAssignmentDocument, ShiftAssignmentSchema } from './models/shift-assignment.schema';
import { connection, Model } from 'mongoose';
import { Types } from 'mongoose';
import { ShiftAssignmentStatus } from './models/enums';
import { InjectModel } from '@nestjs/mongoose';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';

@Controller('time-management')
export class TimeManagementController {
    constructor(
        private shiftAssignmentService: ShiftAssignmentService,
        private notificationLogService: NotificationLogService
    ){}
    //Shift Assignment Functions
    @Post('assign-shift')
    async assignShift(@Body() assignData: ShiftAssignmentCreateDto){
        this.shiftAssignmentService.assignShift(assignData);
    }

    //Notification Log Functions
    @Post('notification')
    async sendNotification(@Body()notifData:NotificationLogCreateDto){
        this.notificationLogService.sendNotification(notifData);
    }
}
