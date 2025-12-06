import { Model } from 'mongoose';
import { payrollRuns } from './models/payrollRuns.schema';
import { employeePayrollDetails } from './models/employeePayrollDetails.schema';
import { employeePenalties } from './models/employeePenalties.schema';
import { employeeSigningBonus } from './models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation } from './models/EmployeeTerminationResignation.schema';
import { GeneratePayrollDraftDto } from './dto/generate-payroll-draft.dto';
import { Phase1_1BDto } from './dto/phase-1-1B.dto';
export declare class PayrollPhase1_1BService {
    private payrollRunsModel;
    private employeeProfileModel;
    private payrollDetailsModel;
    private penaltiesModel;
    private signingBonusModel;
    private exitBenefitsModel;
    constructor(payrollRunsModel: Model<payrollRuns>, employeeProfileModel: Model<any>, payrollDetailsModel: Model<employeePayrollDetails>, penaltiesModel: Model<employeePenalties>, signingBonusModel: Model<employeeSigningBonus>, exitBenefitsModel: Model<EmployeeTerminationResignation>);
    processPayrollValues(dto: GeneratePayrollDraftDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptions: number;
        totalNetPay: number;
    }>;
    applyPenalties(dto: Phase1_1BDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptions: number;
        totalNetPay: number;
    }>;
}
