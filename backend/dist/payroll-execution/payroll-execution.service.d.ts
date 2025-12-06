import { Model } from 'mongoose';
import { UpdatePayrollPeriodDto } from './dto/update-payroll-period.dto';
import { StartPayrollRunDto } from './dto/start-payroll-run.dto';
import { EditExitBenefitsDto } from './dto/phase-0.dto';
export declare class PayrollExecutionService {
    private signingBonusModel;
    private exitBenefitsModel;
    private payrollRuns;
    private payrollRunsModel;
    private employeeProfileModel;
    constructor(signingBonusModel: Model<any>, exitBenefitsModel: Model<any>, payrollRuns: Model<any>, payrollRunsModel: Model<any>, employeeProfileModel: Model<any>);
    approveSigningBonus(id: string): Promise<any>;
    rejectSigningBonus(id: string): Promise<any>;
    editSigningBonus(id: string, dto: any): Promise<any>;
    approveExitBenefits(id: string): Promise<any>;
    rejectExitBenefits(id: string): Promise<any>;
    editExitBenefits(id: string, dto: EditExitBenefitsDto): Promise<{
        record: any;
    }>;
    validatePhase0(): Promise<{
        ready: boolean;
        pendingItems: any[];
        message: string;
    } | {
        ready: boolean;
        message: string;
        pendingItems?: undefined;
    }>;
    updatePayrollPeriod(dto: UpdatePayrollPeriodDto): Promise<{
        message: string;
        payrollRun: any;
    }>;
    startPayrollInitiation(dto: StartPayrollRunDto): Promise<{
        message: string;
        payrollRun: any;
    }>;
}
