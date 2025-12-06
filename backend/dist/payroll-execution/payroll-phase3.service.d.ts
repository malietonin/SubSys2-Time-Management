import { Model, Types } from 'mongoose';
import { payrollRuns } from './models/payrollRuns.schema';
import { PayrollApproveDto, LockPayrollDto, UnfreezePayrollDto } from './dto/phase3.dto';
import { EmployeeSystemRole } from '../employee-profile/models/employee-system-role.schema';
export declare class PayrollPhase3Service {
    private readonly payrollRunsModel;
    private readonly systemRoleModel;
    constructor(payrollRunsModel: Model<payrollRuns>, systemRoleModel: Model<EmployeeSystemRole>);
    reviewPayrollRun(payrollRunId: string): Promise<import("mongoose").Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    managerApprove(dto: PayrollApproveDto): Promise<import("mongoose").Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    financeApprove(dto: PayrollApproveDto): Promise<import("mongoose").Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    lockPayroll(dto: LockPayrollDto): Promise<import("mongoose").Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    unfreezePayroll(dto: UnfreezePayrollDto): Promise<import("mongoose").Document<unknown, {}, payrollRuns, {}, {}> & payrollRuns & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
}
