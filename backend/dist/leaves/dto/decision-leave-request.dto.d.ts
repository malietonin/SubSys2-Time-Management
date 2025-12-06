import { LeaveStatus } from '../enums/leave-status.enum';
export declare class DecisionLeaveRequestDto {
    requestId: string;
    approverId: string;
    decision: LeaveStatus;
    comment?: string;
}
