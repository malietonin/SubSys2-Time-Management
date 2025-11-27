import { NotificationLogService } from './services/notification-log.service';
import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';
import { ShiftTypeCreateDto } from './dtos/shift-type-create-dto';
import { ShiftTypeService } from './services/shift-type.service';
import { Types } from 'mongoose';

@Controller('time-management')
export class TimeManagementController {
    constructor(
        private shiftAssignmentService: ShiftAssignmentService,
        private notificationLogService: NotificationLogService,
        private shiftTypeService:ShiftTypeService
    ){}
    //Shift Assignment Functions
    @Post('assign-shift')
    async assignShift(@Body() assignData: ShiftAssignmentCreateDto){
        return this.shiftAssignmentService.assignShift(assignData);
    }

    //Notification Log Functions
    @Post('notification-log')
    async sendNotification(@Body()notifData:NotificationLogCreateDto){
        return this.notificationLogService.sendNotification(notifData);
    }
    @Get('notification-log')
    async getAllNotifications(){
        return this.notificationLogService.getAllNotifications()
    }
    @Get('notification-log/:id')
    async getEmployeeNotifications(@Param('id') employeeId:string){
        return this.notificationLogService.getEmployeeNotifications(employeeId)
    }

    //Shift Type Functions
    @Post('shift-type')
    async createShiftType(@Body()shiftTypeData:ShiftTypeCreateDto){
        return this.shiftTypeService.createShiftType(shiftTypeData);
    }
    @Get('shift-type')
    async getAllShiftTypes(){
        return this.shiftTypeService.getAllShiftTypes();
    }
    @Get('shift-type/:id')
    async getShiftTypeById(@Param('id')shiftTypeId:string){
        return this.shiftTypeService.getShiftTypeById(shiftTypeId)
    }
    @Delete('shift-type/:id')
    async deleteShiftType(@Param('id')shiftTypeId:string){
        return this.shiftTypeService.deleteShiftType(shiftTypeId)
    }

}


