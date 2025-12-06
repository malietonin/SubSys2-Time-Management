import { RefundStatus } from '../enums/payroll-tracking-enum';
export declare class RefundDetailsDto {
    description: string;
    amount: number;
}
export declare class CreateRefundDto {
    claimId?: string;
    disputeId?: string;
    employeeId: string;
    refundDetails: RefundDetailsDto;
}
export declare class UpdateRefundStatusDto {
    status: RefundStatus;
    financeStaffId?: string;
    paidInPayrollRunId?: string;
}
