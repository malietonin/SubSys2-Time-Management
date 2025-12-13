import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { TimeException } from '../models/time-exception.schema';
import { TimeExceptionCreateDto } from '../dtos/create-time-exception.dto';
import { TimeExceptionUpdateDto } from '../dtos/update-time-exception.dto';
export declare class TimeExceptionService {
    private readonly timeExceptionModel;
    constructor(timeExceptionModel: Model<TimeException>);
    create(dto: TimeExceptionCreateDto): Promise<import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    listAll(): Promise<(import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    update(id: string, dto: TimeExceptionUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    approve(id: string, approvedBy: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    reject(id: string, rejectedBy: string, reason: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    autoEscalatePending(): Promise<{
        success: boolean;
        message: string;
        count: number;
    }>;
    forcePending(id: string): Promise<(import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    escalatePendingExceptions(): Promise<{
        matched: number;
        modified: number;
    }>;
    escalate(id: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
}
