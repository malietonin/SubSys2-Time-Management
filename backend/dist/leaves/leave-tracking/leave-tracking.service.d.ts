import { Model, Types } from 'mongoose';
import { LeaveEntitlement, LeaveEntitlementDocument } from '../models/leave-entitlement.schema';
import { LeavePolicyDocument } from '../models/leave-policy.schema';
export declare class LeaveTrackingService {
    private readonly entitlementModel;
    private readonly policyModel;
    private readonly logger;
    constructor(entitlementModel: Model<LeaveEntitlementDocument>, policyModel: Model<LeavePolicyDocument>);
    accrueEntitlements(): Promise<{
        processed: number;
    }>;
    accrueLeave(): Promise<{
        processed: number;
    }>;
    adjustLeave(dto: {
        employeeId: string;
        leaveType: string;
        newBalance: number;
        hrId: string;
        reason: string;
    }): Promise<{
        message: string;
    }>;
    yearEndProcessing(): Promise<{
        message: string;
        processed: number;
    }>;
    calculateEncashment(employeeId: string, dailySalary: number): Promise<{
        employeeId: string;
        totalEncashableDays: number;
        dailySalary: number;
        payout: number;
    }>;
    createEntitlementForEmployee(employee: any): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, Omit<{
        employeeId: Types.ObjectId;
        leaveTypeId: Types.ObjectId;
        yearlyEntitlement: number;
        accruedActual: number;
        accruedRounded: number;
        carryForward: number;
        taken: number;
        pending: number;
        remaining: number;
        lastAccrualDate: null;
        nextResetDate: null;
    }, "_id">>[]>;
    createSingleEntitlement(employeeId: string, leaveTypeId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getLeaveBalances(employeeId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
}
