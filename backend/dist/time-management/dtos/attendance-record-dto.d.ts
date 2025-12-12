import { Types } from 'mongoose';
import { Punch } from '../models/attendance-record.schema';
export declare class CreateAttendanceRecordDto {
    employeeId: Types.ObjectId;
    punches?: Punch[];
    totalWorkMinutes?: number;
    hasMissedPunch?: boolean;
    exceptionIds?: Types.ObjectId[];
    finalisedForPayroll?: boolean;
}
