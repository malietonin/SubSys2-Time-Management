export interface TimeManagementSummary {
    employeeId: string;
    periodMonth: number;
    periodYear: number;
    overtimeHours: number;
    overtimeAmount: number;
    unpaidLeaveDays: number;
    latenessPenaltiesAmount: number;
}
export declare class TimeManagementIntegrationService {
    getTimeManagementSummary(employeeId: string, periodMonth: number, periodYear: number): Promise<TimeManagementSummary>;
}
