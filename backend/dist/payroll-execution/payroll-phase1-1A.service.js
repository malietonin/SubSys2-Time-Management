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
exports.PayrollPhase1_1AService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
let PayrollPhase1_1AService = class PayrollPhase1_1AService {
    payrollRunsModel;
    employeeProfileModel;
    signingBonusModel;
    exitBenefitsModel;
    benefitsConfigModel;
    constructor(payrollRunsModel, employeeProfileModel, signingBonusModel, exitBenefitsModel, benefitsConfigModel) {
        this.payrollRunsModel = payrollRunsModel;
        this.employeeProfileModel = employeeProfileModel;
        this.signingBonusModel = signingBonusModel;
        this.exitBenefitsModel = exitBenefitsModel;
        this.benefitsConfigModel = benefitsConfigModel;
    }
    async processHREvents(dto) {
        const { payrollRunId } = dto;
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.DRAFT) {
            throw new common_1.BadRequestException('HR Events can only be processed while payroll is in DRAFT state.');
        }
        const employees = await this.employeeProfileModel.find({});
        let signingBonusProcessed = 0;
        let exitBenefitsProcessed = 0;
        let proratedEmployees = 0;
        const exitBenefitsResponse = [];
        for (const emp of employees) {
            if (emp.isNewHire && emp.onProbation) {
                proratedEmployees++;
            }
            const bonus = await this.signingBonusModel.findOne({
                employeeId: emp._id,
            });
            if (bonus &&
                emp.eligibleForBonus &&
                bonus.status === payroll_execution_enum_1.BonusStatus.PENDING) {
                bonus.status = payroll_execution_enum_1.BonusStatus.APPROVED;
                await bonus.save();
                signingBonusProcessed++;
            }
            const exit = await this.exitBenefitsModel.findOne({
                employeeId: emp._id,
            });
            if (exit && exit.status === payroll_execution_enum_1.BenefitStatus.PENDING) {
                const config = await this.benefitsConfigModel.findById(exit.benefitId);
                const computed = config?.amount ?? 0;
                exit.status = payroll_execution_enum_1.BenefitStatus.APPROVED;
                await exit.save();
                exitBenefitsProcessed++;
                exitBenefitsResponse.push({
                    employeeId: emp._id,
                    benefitId: exit.benefitId,
                    terminationId: exit.terminationId,
                    computedAmount: computed,
                    ruleApplied: config?.name,
                });
            }
        }
        return {
            message: 'HR Events processed successfully.',
            summary: {
                employeesChecked: employees.length,
                proratedEmployees,
                signingBonusProcessed,
                exitBenefitsProcessed,
            },
            exitBenefitsDetails: exitBenefitsResponse,
        };
    }
    calculateProrated(emp) {
        const base = emp.baseSalary ?? 0;
        const totalDays = 30;
        const activeDays = emp.activeDaysInPeriod ?? totalDays;
        return (base * activeDays) / totalDays;
    }
};
exports.PayrollPhase1_1AService = PayrollPhase1_1AService;
exports.PayrollPhase1_1AService = PayrollPhase1_1AService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('payrollRuns')),
    __param(1, (0, mongoose_1.InjectModel)('EmployeeProfile')),
    __param(2, (0, mongoose_1.InjectModel)('employeeSigningBonus')),
    __param(3, (0, mongoose_1.InjectModel)('EmployeeTerminationResignation')),
    __param(4, (0, mongoose_1.InjectModel)('terminationAndResignationBenefits')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase1_1AService);
//# sourceMappingURL=payroll-phase1-1A.service.js.map