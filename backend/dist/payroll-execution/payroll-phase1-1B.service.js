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
exports.PayrollPhase1_1BService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
let PayrollPhase1_1BService = class PayrollPhase1_1BService {
    payrollRunsModel;
    employeeProfileModel;
    payrollDetailsModel;
    penaltiesModel;
    signingBonusModel;
    exitBenefitsModel;
    constructor(payrollRunsModel, employeeProfileModel, payrollDetailsModel, penaltiesModel, signingBonusModel, exitBenefitsModel) {
        this.payrollRunsModel = payrollRunsModel;
        this.employeeProfileModel = employeeProfileModel;
        this.payrollDetailsModel = payrollDetailsModel;
        this.penaltiesModel = penaltiesModel;
        this.signingBonusModel = signingBonusModel;
        this.exitBenefitsModel = exitBenefitsModel;
    }
    async processPayrollValues(dto) {
        const { payrollRunId } = dto;
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException('Phase 1.1.B can only run after draft generation (status UNDER_REVIEW).');
        }
        const employees = await this.employeeProfileModel.find({ contractStatus: 'active' });
        let totalNetPay = 0;
        let exceptions = 0;
        const details = [];
        for (const emp of employees) {
            const baseSalary = emp.baseSalary ?? 0;
            const allowances = emp.allowancesTotal ?? 0;
            const penaltyDoc = await this.penaltiesModel.findOne({ employeeId: emp._id });
            const penaltiesTotal = penaltyDoc?.penalties?.reduce((sum, p) => sum + (p.amount || 0), 0) ?? 0;
            const bonusDoc = await this.signingBonusModel.findOne({ employeeId: emp._id });
            const bonusAmount = bonusDoc && bonusDoc.status === payroll_execution_enum_1.BonusStatus.APPROVED
                ? emp.signingBonusAmount ?? 0
                : 0;
            const exitDoc = await this.exitBenefitsModel.findOne({ employeeId: emp._id });
            const exitBenefitAmount = exitDoc && exitDoc.status === payroll_execution_enum_1.BenefitStatus.APPROVED
                ? emp.exitBenefitAmount ?? 0
                : 0;
            const gross = baseSalary + allowances + bonusAmount + exitBenefitAmount;
            const deductions = penaltiesTotal;
            const netPay = gross - deductions;
            totalNetPay += netPay;
            const hasBank = !!emp.bankAccount;
            const bankStatus = hasBank ? payroll_execution_enum_1.BankStatus.VALID : payroll_execution_enum_1.BankStatus.MISSING;
            details.push({
                employeeId: emp._id,
                baseSalary,
                allowances,
                deductions,
                netSalary: gross - deductions,
                netPay,
                bankStatus,
                exceptions: hasBank ? null : 'Missing bank account',
                bonus: bonusAmount,
                benefit: exitBenefitAmount,
                payrollRunId: run._id,
            });
            if (!hasBank)
                exceptions++;
        }
        await this.payrollDetailsModel.insertMany(details);
        run.totalnetpay = totalNetPay;
        run.exceptions = exceptions;
        await run.save();
        return {
            message: 'Phase 1.1.B processed successfully.',
            employeesProcessed: employees.length,
            exceptions,
            totalNetPay,
        };
    }
    async applyPenalties(dto) {
        return this.processPayrollValues(dto);
    }
};
exports.PayrollPhase1_1BService = PayrollPhase1_1BService;
exports.PayrollPhase1_1BService = PayrollPhase1_1BService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('payrollRuns')),
    __param(1, (0, mongoose_1.InjectModel)('EmployeeProfile')),
    __param(2, (0, mongoose_1.InjectModel)('employeePayrollDetails')),
    __param(3, (0, mongoose_1.InjectModel)('employeePenalties')),
    __param(4, (0, mongoose_1.InjectModel)('employeeSigningBonus')),
    __param(5, (0, mongoose_1.InjectModel)('EmployeeTerminationResignation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase1_1BService);
//# sourceMappingURL=payroll-phase1-1B.service.js.map