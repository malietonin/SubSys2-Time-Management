import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto } from '../dto/create-leave-request.dto';
import { DecisionLeaveRequestDto } from '../dto/decision-leave-request.dto';
export declare class LeaveRequestController {
    private readonly service;
    constructor(service: LeaveRequestService);
    create(dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../models/leave-request.schema").LeaveRequest, {}, {}> & import("../models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../models/leave-request.schema").LeaveRequest, {}, {}> & import("../models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    decide(dto: DecisionLeaveRequestDto): Promise<{
        message: string;
        requestId: string;
    }>;
    cancel(requestId: string): Promise<{
        message: string;
        requestId: string;
    }>;
    listForEmployee(employeeId: string, status?: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../models/leave-request.schema").LeaveRequest, {}, {}> & import("../models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    get(id: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../models/leave-request.schema").LeaveRequest, {}, {}> & import("../models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
