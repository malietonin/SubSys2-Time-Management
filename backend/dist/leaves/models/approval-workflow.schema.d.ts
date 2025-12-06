import { HydratedDocument, Types } from 'mongoose';
export type ApprovalWorkflowDocument = HydratedDocument<ApprovalWorkflow>;
export declare class ApprovalWorkflow {
    leaveTypeId: Types.ObjectId;
    flow: {
        role: string;
        order: number;
    }[];
}
export declare const ApprovalWorkflowSchema: import("mongoose").Schema<ApprovalWorkflow, import("mongoose").Model<ApprovalWorkflow, any, any, any, import("mongoose").Document<unknown, any, ApprovalWorkflow, any, {}> & ApprovalWorkflow & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ApprovalWorkflow, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ApprovalWorkflow>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ApprovalWorkflow> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
