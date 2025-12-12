import { Model, Types } from "mongoose";
import { ScheduleRule, ScheduleRuleDocument } from "../models/schedule-rule.schema";
import { ScheduleRuleCreateDto } from "./../dtos/schedule-rule-create-dto";
import { ScheduleRuleUpdateDto } from "./../dtos/schedule-rule-update-dto";
export declare class ScheduleRuleService {
    private scheduleRuleModel;
    constructor(scheduleRuleModel: Model<ScheduleRuleDocument>);
    createScheduleRule(dto: ScheduleRuleCreateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllScheduleRules(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getScheduleRuleById(id: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateScheduleRule(id: Types.ObjectId, dto: ScheduleRuleUpdateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    deleteScheduleRule(id: Types.ObjectId): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ScheduleRule, {}, {}> & ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
}
