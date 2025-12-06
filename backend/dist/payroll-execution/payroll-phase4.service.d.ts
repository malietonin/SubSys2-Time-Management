import { Model } from 'mongoose';
import { GeneratePayslipsDto } from './dto/generate-payslips.dto';
import { paySlip } from './models/payslip.schema';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { payrollRuns } from './models/payrollRuns.schema';
export declare class PayrollPhase4Service {
    private payslipModel;
    private employeeDetailsModel;
    private payrollRunsModel;
    constructor(payslipModel: Model<paySlip>, employeeDetailsModel: Model<employeePayrollDetails>, payrollRunsModel: Model<payrollRuns>);
    generatePayslips(dto: GeneratePayslipsDto): Promise<{
        message: string;
        payrollRunId: string;
        payslipsGenerated: number;
        details: {
            employeeId: any;
            status: string;
            payslipId?: any;
        }[];
    }>;
}
