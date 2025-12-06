import { LeaveTrackingService } from './leave-tracking.service';
import { AdjustLeaveDto } from '../dto/adjust-leave.dto';
export declare class LeaveTrackingController {
    private readonly leaveTrackingService;
    constructor(leaveTrackingService: LeaveTrackingService);
    accrue(): Promise<{
        processed: number;
    }>;
    adjust(dto: AdjustLeaveDto): Promise<{
        message: string;
    }>;
    yearEnd(): Promise<{
        message: string;
        processed: number;
    }>;
    encash(employeeId: string, dailySalary: string): Promise<{
        employeeId: string;
        totalEncashableDays: number;
        dailySalary: number;
        payout: number;
    }>;
    getBalance(employeeId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("../models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createSingleEntitlement(employeeId: string, leaveTypeId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("../models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../models/leave-entitlement.schema").LeaveEntitlement, {}, {}> & import("../models/leave-entitlement.schema").LeaveEntitlement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
