import { Model, Types } from 'mongoose';
import { CreateLeaveRequestDto } from '../dto/create-leave-request.dto';
import { DecisionLeaveRequestDto } from '../dto/decision-leave-request.dto';
import { LeaveRequest, LeaveRequestDocument } from '../models/leave-request.schema';
import { ApprovalWorkflowDocument } from '../models/approval-workflow.schema';
import { LeaveEntitlementDocument } from '../models/leave-entitlement.schema';
import { LeavePolicyDocument } from '../models/leave-policy.schema';
import { CalendarDocument } from '../models/calendar.schema';
import { LeaveTypeDocument } from '../models/leave-type.schema';
export declare class LeaveRequestService {
    private readonly requestModel;
    private readonly workflowModel;
    private readonly entitlementModel;
    private readonly policyModel;
    private readonly calendarModel;
    private readonly typeModel;
    private readonly logger;
    constructor(requestModel: Model<LeaveRequestDocument>, workflowModel: Model<ApprovalWorkflowDocument>, entitlementModel: Model<LeaveEntitlementDocument>, policyModel: Model<LeavePolicyDocument>, calendarModel: Model<CalendarDocument>, typeModel: Model<LeaveTypeDocument>);
    private calculateNetDays;
    private buildApprovalFlow;
    createRequest(dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    decideRequest(dto: DecisionLeaveRequestDto): Promise<{
        message: string;
        requestId: string;
    }>;
    getRequestsForEmployee(employeeId: string, status?: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    cancelRequest(requestId: string): Promise<{
        message: string;
        requestId: string;
    }>;
    getRequestById(id: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>) | null>;
}
