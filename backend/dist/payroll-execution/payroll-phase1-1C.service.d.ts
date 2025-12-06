import { Model } from 'mongoose';
import { payrollRuns } from './models/payrollRuns.schema';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { GeneratePayrollDraftFileDto } from './dto/generate-payroll-draft-file.dto';
export declare class PayrollPhase1_1CService {
    private payrollRunsModel;
    private payrollDetailsModel;
    constructor(payrollRunsModel: Model<payrollRuns>, payrollDetailsModel: Model<employeePayrollDetails>);
    generateDraftFile(dto: GeneratePayrollDraftFileDto): Promise<{
        message: string;
        payrollRunId: any;
        fileName: string;
        contentType: string;
        data: string;
    } | {
        message: string;
    }>;
    private generateCSV;
}
