import { Types } from 'mongoose';
export declare class ShiftAssignmentCreateDto {
    employeeId?: Types.ObjectId;
    departmentId?: Types.ObjectId;
    positionId?: Types.ObjectId;
    shiftId: Types.ObjectId;
    scheduleRuleId?: Types.ObjectId;
    startDate: Date;
    endDate?: Date;
}
