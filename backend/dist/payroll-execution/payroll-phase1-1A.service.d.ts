import { Model } from 'mongoose';
import { payrollRuns } from './models/payrollRuns.schema';
import { ProcessHREventsDto } from './dto/process-hr-events.dto';
import { employeeSigningBonus } from './models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation } from './models/EmployeeTerminationResignation.schema';
import { terminationAndResignationBenefits } from './../payroll-configuration/models/terminationAndResignationBenefits';
export declare class PayrollPhase1_1AService {
    private payrollRunsModel;
    private employeeProfileModel;
    private signingBonusModel;
    private exitBenefitsModel;
    private benefitsConfigModel;
    constructor(payrollRunsModel: Model<payrollRuns>, employeeProfileModel: Model<any>, signingBonusModel: Model<employeeSigningBonus>, exitBenefitsModel: Model<EmployeeTerminationResignation>, benefitsConfigModel: Model<terminationAndResignationBenefits>);
    processHREvents(dto: ProcessHREventsDto): Promise<{
        message: string;
        summary: {
            employeesChecked: number;
            proratedEmployees: number;
            signingBonusProcessed: number;
            exitBenefitsProcessed: number;
        };
        exitBenefitsDetails: {
            employeeId: any;
            benefitId: any;
            terminationId: any;
            computedAmount: number;
            ruleApplied: string | undefined;
        }[];
    }>;
    private calculateProrated;
}
