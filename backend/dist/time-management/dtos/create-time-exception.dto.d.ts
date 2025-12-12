import { TimeExceptionType } from '../models/enums';
export declare class TimeExceptionCreateDto {
    employeeId: string;
    type: TimeExceptionType;
    attendanceRecordId: string;
    assignedTo: string;
    reason?: string;
}
