import { HydratedDocument, Types } from 'mongoose';
import { ClaimStatus } from '../enums/payroll-tracking-enum';
export type ClaimsDocument = HydratedDocument<Claims>;
export declare class Claims {
    claimId: string;
    description: string;
    claimType: string;
    employeeId: Types.ObjectId;
    financeStaffId?: Types.ObjectId;
    amount: number;
    approvedAmount?: number;
    status: ClaimStatus;
    rejectionReason?: string;
    resolutionComment?: string;
}
export declare const claimsSchema: import("mongoose").Schema<Claims, import("mongoose").Model<Claims, any, any, any, import("mongoose").Document<unknown, any, Claims, any, {}> & Claims & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Claims, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Claims>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Claims> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
