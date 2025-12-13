import { Model, Types } from 'mongoose';
import { AttendanceRecord, AttendanceRecordDocument, Punch } from '../models/attendance-record.schema';
import { CreateAttendancePunchDto } from '../dtos/create-attendance-record-dto';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { ScheduleRuleDocument } from '../models/schedule-rule.schema';
import { ShiftAssignmentDocument } from '../models/shift-assignment.schema';
import { LatenessRuleService } from './lateness-rule.service';
import { CreateAttendanceRecordDto } from '../dtos/attendance-record-dto';
import { UpdateAttendanceRecordDto } from '../dtos/update-attendance-record-dto';
import { HolidayService } from './holiday.service';
export declare class AttendanceRecordService {
    private attendanceModel;
    private employeeProfileService;
    private scheduleRuleModel;
    private shiftAssignmentModel;
    private latenessRuleService;
    private holidayService;
    constructor(attendanceModel: Model<AttendanceRecordDocument>, employeeProfileService: EmployeeProfileService, scheduleRuleModel: Model<ScheduleRuleDocument>, shiftAssignmentModel: Model<ShiftAssignmentDocument>, latenessRuleService: LatenessRuleService, holidayService: HolidayService);
    createAttendanceRecord(dto: CreateAttendanceRecordDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateAttendanceRecord(id: string, dto: UpdateAttendanceRecordDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    flagRepeatedLateness(employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            repeated: {
                success: boolean;
                message: string;
                repeatedLateness: number;
                isRepeated?: undefined;
                action?: undefined;
            } | {
                success: boolean;
                repeatedLateness: number;
                isRepeated: boolean;
                action: string;
                message?: undefined;
            };
        };
    }>;
    recordClockIn(dto: CreateAttendancePunchDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    recordClockOut(dto: CreateAttendancePunchDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    detectMissedPunches(employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    listAttendanceForEmployee(employeeId: string, startDate?: string, endDate?: string): Promise<{
        success: boolean;
        message: string;
        data: Punch[];
    }>;
    updatePunchByTime(employeeId: string, punchTime: string, update: {
        time?: string;
        type?: 'IN' | 'OUT';
    }): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deletePunchByTime(employeeId: string, punchTime: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deletePunchesForDate(employeeId: string, date: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
}
