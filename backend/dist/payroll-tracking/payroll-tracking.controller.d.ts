import { PayrollTrackingService } from './payroll-tracking.service';
import { CreateRefundDto, UpdateRefundStatusDto } from './dto/create-refund.dto';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimStatusDto } from './dto/update-claim-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeStatusDto } from './dto/update-dispute-status.dto';
export declare class PayrollTrackingController {
    private readonly payrollTrackingService;
    constructor(payrollTrackingService: PayrollTrackingService);
    getMyClaims(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/claims.schema").Claims, {}, {}> & import("./models/claims.schema").Claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createClaim(dto: CreateClaimDto): Promise<import("mongoose").Document<unknown, {}, import("./models/claims.schema").Claims, {}, {}> & import("./models/claims.schema").Claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyDisputes(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createDispute(dto: CreateDisputeDto): Promise<import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingClaims(): Promise<(import("mongoose").Document<unknown, {}, import("./models/claims.schema").Claims, {}, {}> & import("./models/claims.schema").Claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approveClaim(claimId: string, dto: UpdateClaimStatusDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/claims.schema").Claims, {}, {}> & import("./models/claims.schema").Claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    rejectClaim(claimId: string, dto: UpdateClaimStatusDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/claims.schema").Claims, {}, {}> & import("./models/claims.schema").Claims & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getPendingDisputes(): Promise<(import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approveDispute(disputeId: string, dto: UpdateDisputeStatusDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    rejectDispute(disputeId: string, dto: UpdateDisputeStatusDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/disputes.schema").disputes, {}, {}> & import("./models/disputes.schema").disputes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createRefund(dto: CreateRefundDto): Promise<import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateRefund(refundId: string, dto: UpdateRefundStatusDto): Promise<(import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    listRefunds(): Promise<(import("mongoose").Document<unknown, {}, import("./models/refunds.schema").refunds, {}, {}> & import("./models/refunds.schema").refunds & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
