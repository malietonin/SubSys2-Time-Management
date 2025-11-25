import { BadRequestException, Controller, Post, Body } from '@nestjs/common';
import { Shift } from './models/shift.schema';
import { ShiftAssignment, ShiftAssignmentDocument, ShiftAssignmentSchema } from './models/shift-assignment.schema';
import { connection, Model } from 'mongoose';
import { Types } from 'mongoose';
import { ShiftAssignmentStatus } from './models/enums';
import { InjectModel } from '@nestjs/mongoose';

@Controller('time-management')
export class TimeManagementController {
}
