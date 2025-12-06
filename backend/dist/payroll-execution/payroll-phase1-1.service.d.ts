import { Model } from 'mongoose';
import { payrollRuns } from './models/payrollRuns.schema';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { PayRollStatus } from './enums/payroll-execution-enum';
import { GeneratePayrollDraftDto } from './dto/generate-payroll-draft.dto';
export declare class PayrollPhase1_1Service {
    private payrollRunsModel;
    private employeeDetailsModel;
    private employeeProfileModel;
    constructor(payrollRunsModel: Model<payrollRuns>, employeeDetailsModel: Model<employeePayrollDetails>, employeeProfileModel: Model<any>);
    generatePayrollDraft(dto: GeneratePayrollDraftDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptions: number;
        totalNetPay: number;
        runStatus: PayRollStatus.UNDER_REVIEW;
    }>;
}
