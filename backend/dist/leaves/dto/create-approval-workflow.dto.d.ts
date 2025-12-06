declare class ApprovalStepDto {
    role: string;
    order: number;
}
export declare class CreateApprovalWorkflowDto {
    leaveTypeId: string;
    flow: ApprovalStepDto[];
}
export {};
