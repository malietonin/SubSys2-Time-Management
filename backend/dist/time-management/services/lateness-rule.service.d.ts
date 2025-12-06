import { Model, Types } from 'mongoose';
import { LatenessRule, LatenessRuleDocument } from '../models/lateness-rule.schema';
import { LatenessRuleCreateDto } from '../dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from '../dtos/lateness-rule-update.dto';
import { ShiftDocument } from '../models/shift.schema';
import { ShiftAssignmentDocument } from '../models/shift-assignment.schema';
import { AttendanceRecordDocument } from '../../time-management/models/attendance-record.schema';
import { ScheduleRuleDocument } from '../../time-management/models/schedule-rule.schema';
export declare class LatenessRuleService {
    private readonly latenessRuleModel;
    private readonly attendanceRecordModel;
    private readonly scheduleRuleModel;
    private readonly shiftModel;
    private readonly shiftAssignmentModel;
    constructor(latenessRuleModel: Model<LatenessRuleDocument>, attendanceRecordModel: Model<AttendanceRecordDocument>, scheduleRuleModel: Model<ScheduleRuleDocument>, shiftModel: Model<ShiftDocument>, shiftAssignmentModel: Model<ShiftAssignmentDocument>);
    createLatenessRule(dto: LatenessRuleCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    listLatenessRules(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    updateLatenessRule(id: string, dto: LatenessRuleUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteLatenessRule(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    getActiveRule(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LatenessRule, {}, {}> & LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    applyLatenessPenalty(actualMinutesLate: number, ruleId: string): Promise<{
        success: boolean;
        ruleUsed: string;
        effectiveLateMinutes: number;
        calculatedPenalty: number;
    }>;
    detectRepeatedLateness(employeeId: string): Promise<{
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
    }>;
}
