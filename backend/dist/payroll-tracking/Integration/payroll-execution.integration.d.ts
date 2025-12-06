export interface PayrollPayslipSummary {
    id: string;
    employeeId: string;
    periodMonth: number;
    periodYear: number;
    grossSalary: number;
    netSalary: number;
    basicSalary: number;
    allowancesTotal: number;
    deductionsTotal: number;
}
export declare class PayrollExecutionIntegrationService {
    getPayslipById(payslipId: string): Promise<PayrollPayslipSummary | null>;
    getPayslipsForEmployee(employeeId: string): Promise<PayrollPayslipSummary[]>;
}
