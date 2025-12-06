import { PayrollExecutionService } from './payroll-execution.service';
import { UpdatePayrollPeriodDto } from './dto/update-payroll-period.dto';
import { StartPayrollRunDto } from './dto/start-payroll-run.dto';
import { EditSigningBonusDto, EditExitBenefitsDto } from './dto/phase-0.dto';
import { PayrollPhase1_1Service } from './payroll-phase1-1.service';
import { GeneratePayrollDraftDto } from './dto/generate-payroll-draft.dto';
import { PayrollPhase1_1AService } from './payroll-phase1-1A.service';
import { PayrollPhase1_1BService } from './payroll-phase1-1B.service';
import { ProcessHREventsDto } from './dto/process-hr-events.dto';
import { Phase1_1BDto } from './dto/phase-1-1B.dto';
import { PayrollPhase1_1CService } from './payroll-phase1-1C.service';
import { PayrollPhase2Service } from './payroll-phase2.service';
import { ReviewPayrollDraftDto } from './dto/review-payroll-draft.dto';
import { PayrollPhase3Service } from './payroll-phase3.service';
import { PayrollApproveDto, LockPayrollDto, UnfreezePayrollDto } from './dto/phase3.dto';
import { PayrollPhase4Service } from './payroll-phase4.service';
import { GeneratePayslipsDto } from './dto/generate-payslips.dto';
export declare class PayrollExecutionController {
    private readonly payrollExecutionService;
    private readonly phaseService;
    private readonly phase1AService;
    private readonly phase1BService;
    private readonly phase1CService;
    private readonly phase2Service;
    private readonly phase3Service;
    private readonly phase4Service;
    constructor(payrollExecutionService: PayrollExecutionService, phaseService: PayrollPhase1_1Service, phase1AService: PayrollPhase1_1AService, phase1BService: PayrollPhase1_1BService, phase1CService: PayrollPhase1_1CService, phase2Service: PayrollPhase2Service, phase3Service: PayrollPhase3Service, phase4Service: PayrollPhase4Service);
    approveSigningBonus(id: string): Promise<any>;
    rejectSigningBonus(id: string): Promise<any>;
    editSigningBonus(id: string, dto: EditSigningBonusDto): Promise<any>;
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
    generateDraft(dto: GeneratePayrollDraftDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptions: number;
        totalNetPay: number;
        runStatus: import("./enums/payroll-execution-enum").PayRollStatus.UNDER_REVIEW;
    }>;
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
    applyPenalties(dto: Phase1_1BDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptions: number;
        totalNetPay: number;
    }>;
    generateDraftFile(dto: GeneratePayrollDraftDto): Promise<{
        message: string;
        payrollRunId: any;
        fileName: string;
        contentType: string;
        data: string;
    } | {
        message: string;
    }>;
    reviewPayrollDraft(dto: ReviewPayrollDraftDto): Promise<{
        message: string;
        employeesProcessed: number;
        exceptionsCount: number;
        payrollRunId?: undefined;
        totalNetPay?: undefined;
    } | {
        message: string;
        payrollRunId: import("mongoose").Types.ObjectId;
        employeesProcessed: number;
        exceptionsCount: number;
        totalNetPay: number;
    }>;
    reviewPayroll(payrollRunId: string): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    managerApprove(dto: PayrollApproveDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    financeApprove(dto: PayrollApproveDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    lockPayroll(dto: LockPayrollDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    unfreezePayroll(dto: UnfreezePayrollDto): Promise<import("mongoose").Document<unknown, {}, import("./models/payrollRuns.schema").payrollRuns, {}, {}> & import("./models/payrollRuns.schema").payrollRuns & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
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
