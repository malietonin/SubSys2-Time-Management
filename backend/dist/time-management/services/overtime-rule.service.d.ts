import { Model } from 'mongoose';
import { OvertimeRule, OvertimeRuleDocument } from '../models/overtime-rule.schema';
import { OvertimeRuleCreateDto } from '../dtos/overtime-rule-create.dto';
import { OvertimeRuleUpdateDto } from '../dtos/overtime-rule-update.dto';
import { ApplyOvertimeDto } from '../dtos/apply-overtime.dto';
export declare class OvertimeRuleService {
    private readonly overtimeRuleModel;
    constructor(overtimeRuleModel: Model<OvertimeRuleDocument>);
    createOvertimeRule(dto: OvertimeRuleCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    listOvertimeRules(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateOvertimeRule(id: string, dto: OvertimeRuleUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, OvertimeRule, {}, {}> & OvertimeRule & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteOvertimeRule(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    applyOvertimeCalculation(dto: ApplyOvertimeDto): Promise<{
        success: boolean;
        message: string;
        data: {
            employeeId: string;
            date: string;
            overtimeHours: number;
            approved: boolean;
            ruleUsed: string;
        };
    }>;
}
