import { Model, Types } from 'mongoose';
import { Claims } from './models/claims.schema';
import { disputes } from './models/disputes.schema';
import { refunds } from './models/refunds.schema';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimStatusDto } from './dto/update-claim-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeStatusDto } from './dto/update-dispute-status.dto';
import { CreateRefundDto, UpdateRefundStatusDto } from './dto/create-refund.dto';
export declare class PayrollTrackingService {
    private readonly claimModel;
    private readonly disputeModel;
    private readonly refundModel;
    constructor(claimModel: Model<Claims>, disputeModel: Model<disputes>, refundModel: Model<refunds>);
    generateClaimId(): Promise<string>;
    getClaimsForEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, Claims, {}, {}> & Claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createClaim(dto: CreateClaimDto): Promise<import("mongoose").Document<unknown, {}, Claims, {}, {}> & Claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingClaims(): Promise<(import("mongoose").Document<unknown, {}, Claims, {}, {}> & Claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateClaimStatus(claimMongoId: string, dto: UpdateClaimStatusDto): Promise<(import("mongoose").Document<unknown, {}, Claims, {}, {}> & Claims & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getDisputesForEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createDispute(dto: CreateDisputeDto): Promise<import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingDisputes(): Promise<(import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateDisputeStatus(disputeMongoId: string, dto: UpdateDisputeStatusDto): Promise<(import("mongoose").Document<unknown, {}, disputes, {}, {}> & disputes & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createRefund(dto: CreateRefundDto): Promise<import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateRefundStatus(refundMongoId: string, dto: UpdateRefundStatusDto): Promise<(import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getRefunds(): Promise<(import("mongoose").Document<unknown, {}, refunds, {}, {}> & refunds & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
