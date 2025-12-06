import { CorrectionRequestStatus } from "../models/enums/index";
import { Types } from "mongoose";
export declare class AttendanceCorrectionRequestDto {
    employeeId: Types.ObjectId;
    attendanceRecordId: Types.ObjectId;
    reason?: string;
    status?: CorrectionRequestStatus;
}
export declare class UpdateAttendanceCorrectionRequestDto {
    employeeId?: Types.ObjectId;
    attendanceRecordId?: Types.ObjectId;
    reason?: string;
    status?: CorrectionRequestStatus;
}
