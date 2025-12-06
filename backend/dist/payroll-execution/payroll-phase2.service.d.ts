import { Model, Types } from 'mongoose';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { payrollRuns } from './models/payrollRuns.schema';
import { ReviewPayrollDraftDto } from './dto/review-payroll-draft.dto';
export declare class PayrollPhase2Service {
    private readonly detailsModel;
    private readonly payrollRunsModel;
    private readonly employeeModel;
    private readonly logger;
    constructor(detailsModel: Model<employeePayrollDetails>, payrollRunsModel: Model<payrollRuns>, employeeModel: Model<any>);
    reviewPayrollDraft(dto: ReviewPayrollDraftDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptionsCount: number;
        payrollRunId?: undefined;
        totalNetPay?: undefined;
    } | {
        message: string;
        payrollRunId: Types.ObjectId;
        employeesProcessed: number;
        exceptionsCount: number;
        totalNetPay: number;
    }>;
    private payrollrollFindByIdSafe;
}
