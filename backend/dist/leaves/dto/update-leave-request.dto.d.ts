import { LeaveStatus } from '../enums/leave-status.enum';
export declare class UpdateLeaveRequestDto {
    status?: LeaveStatus;
    decidedBy?: string;
    justification?: string;
}
