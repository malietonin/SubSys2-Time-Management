import { TimeExceptionType, TimeExceptionStatus } from '../models/enums';
export declare class TimeExceptionUpdateDto {
    type?: TimeExceptionType;
    attendanceRecordId?: string;
    assignedTo?: string;
    status?: TimeExceptionStatus;
    reason?: string;
}
