"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollPhase3Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
const employee_system_role_schema_1 = require("../employee-profile/models/employee-system-role.schema");
let PayrollPhase3Service = class PayrollPhase3Service {
    payrollRunsModel;
    systemRoleModel;
    constructor(payrollRunsModel, systemRoleModel) {
        this.payrollRunsModel = payrollRunsModel;
        this.systemRoleModel = systemRoleModel;
    }
    async reviewPayrollRun(payrollRunId) {
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        return run;
    }
    async managerApprove(dto) {
        const run = await this.payrollRunsModel.findById(dto.payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW)
            throw new common_1.BadRequestException('Payroll must be UNDER_REVIEW for manager approval.');
        run.managerApprovalDate = new Date();
        run.status = payroll_execution_enum_1.PayRollStatus.PENDING_FINANCE_APPROVAL;
        await run.save();
        return run;
    }
    async financeApprove(dto) {
        const run = await this.payrollRunsModel.findById(dto.payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.PENDING_FINANCE_APPROVAL)
            throw new common_1.BadRequestException('Payroll must be PENDING_FINANCE_APPROVAL for finance approval.');
        run.financeApprovalDate = new Date();
        run.status = payroll_execution_enum_1.PayRollStatus.APPROVED;
        run.paymentStatus = payroll_execution_enum_1.PayRollPaymentStatus.PAID;
        await run.save();
        return run;
    }
    async lockPayroll(dto) {
        const run = await this.payrollRunsModel.findById(dto.payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.APPROVED)
            throw new common_1.BadRequestException('Payroll must be APPROVED before locking.');
        run.status = payroll_execution_enum_1.PayRollStatus.LOCKED;
        await run.save();
        return run;
    }
    async unfreezePayroll(dto) {
        const run = await this.payrollRunsModel.findById(dto.payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.LOCKED)
            throw new common_1.BadRequestException('Only LOCKED payroll can be unfrozen.');
        run.status = payroll_execution_enum_1.PayRollStatus.UNLOCKED;
        run.unlockReason = dto.reason;
        await run.save();
        return run;
    }
};
exports.PayrollPhase3Service = PayrollPhase3Service;
exports.PayrollPhase3Service = PayrollPhase3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(1, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase3Service);
//# sourceMappingURL=payroll-phase3.service.js.map