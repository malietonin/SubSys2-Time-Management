import { HydratedDocument, Types } from 'mongoose';
export type LeavePaycodeMappingDocument = HydratedDocument<LeavePaycodeMapping>;
export declare class LeavePaycodeMapping {
    leaveTypeId: Types.ObjectId;
    payrollCode: string;
    description?: string;
}
export declare const LeavePaycodeMappingSchema: import("mongoose").Schema<LeavePaycodeMapping, import("mongoose").Model<LeavePaycodeMapping, any, any, any, import("mongoose").Document<unknown, any, LeavePaycodeMapping, any, {}> & LeavePaycodeMapping & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LeavePaycodeMapping, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<LeavePaycodeMapping>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LeavePaycodeMapping> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
