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
exports.PayrollExecutionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
const payroll_execution_enum_2 = require("./enums/payroll-execution-enum");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const payroll_execution_enum_3 = require("./enums/payroll-execution-enum");
const payroll_configuration_enums_1 = require("../payroll-configuration/enums/payroll-configuration-enums");
let PayrollExecutionService = class PayrollExecutionService {
    signingBonusModel;
    exitBenefitsModel;
    payrollRuns;
    payrollRunsModel;
    employeeProfileModel;
    constructor(signingBonusModel, exitBenefitsModel, payrollRuns, payrollRunsModel, employeeProfileModel) {
        this.signingBonusModel = signingBonusModel;
        this.exitBenefitsModel = exitBenefitsModel;
        this.payrollRuns = payrollRuns;
        this.payrollRunsModel = payrollRunsModel;
        this.employeeProfileModel = employeeProfileModel;
    }
    async approveSigningBonus(id) {
        const bonus = await this.signingBonusModel.findById(id).populate('signingBonusId');
        if (!bonus) {
            throw new common_1.NotFoundException('Employee signing bonus not found');
        }
        const template = bonus.signingBonusId;
        if (template.status !== payroll_configuration_enums_1.ConfigStatus.APPROVED) {
            throw new common_1.BadRequestException('Cannot approve employee bonus: signing bonus template is not approved');
        }
        if (bonus.status !== payroll_execution_enum_1.BonusStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending bonuses can be approved');
        }
        const employee = await this.employeeProfileModel.findById(bonus.employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        if (employee.status !== employee_profile_enums_1.EmployeeStatus.ACTIVE) {
            throw new common_1.BadRequestException('Employee is not active');
        }
        bonus.status = payroll_execution_enum_1.BonusStatus.APPROVED;
        bonus['approvedAt'] = new Date();
        return bonus.save();
    }
    async rejectSigningBonus(id) {
        const bonus = await this.signingBonusModel.findById(id);
        if (!bonus) {
            throw new common_1.NotFoundException('Signing bonus not found');
        }
        if (bonus.status !== payroll_execution_enum_1.BonusStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending bonuses can be rejected');
        }
        bonus.status = payroll_execution_enum_1.BonusStatus.REJECTED;
        return bonus.save();
    }
    async editSigningBonus(id, dto) {
        const bonus = await this.signingBonusModel.findById(id);
        if (!bonus)
            throw new common_1.NotFoundException('Signing bonus not found');
        if (dto.givenAmount !== undefined) {
            if (dto.givenAmount < 0)
                throw new common_1.BadRequestException('Amount cannot be negative');
            bonus.givenAmount = dto.givenAmount;
        }
        bonus.status = payroll_execution_enum_1.BonusStatus.PENDING;
        bonus.approvedBy = null;
        bonus.approvedAt = null;
        return bonus.save();
    }
    async approveExitBenefits(id) {
        const record = await this.exitBenefitsModel.findById(id).populate('benefitId');
        if (!record) {
            throw new common_1.NotFoundException('Exit benefits not found');
        }
        if (!record.benefitId) {
            throw new common_1.BadRequestException('Cannot approve exit benefits: benefit template is missing');
        }
        const template = record.benefitId;
        if (template.status !== payroll_configuration_enums_1.ConfigStatus.APPROVED) {
            throw new common_1.BadRequestException('Cannot approve exit benefits: template is not approved');
        }
        if (record.status !== payroll_execution_enum_2.BenefitStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending benefits can be approved');
        }
        record.status = payroll_execution_enum_2.BenefitStatus.APPROVED;
        return record.save();
    }
    async rejectExitBenefits(id) {
        const record = await this.exitBenefitsModel.findById(id);
        if (!record) {
            throw new common_1.NotFoundException('Exit benefits not found');
        }
        if (record.status !== payroll_execution_enum_2.BenefitStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending benefits can be approved');
        }
        record.status = payroll_execution_enum_2.BenefitStatus.REJECTED;
        return record.save();
    }
    async editExitBenefits(id, dto) {
        const record = await this.exitBenefitsModel.findById(id);
        if (!record) {
            throw new common_1.NotFoundException('Exit benefits record not found');
        }
        if (dto.amount !== undefined) {
            if (dto.amount < 0)
                throw new common_1.BadRequestException('Amount cannot be negative');
            record.givenAmount = dto.amount;
        }
        if (dto.notes !== undefined) {
            record.notes = dto.notes;
        }
        record.status = payroll_execution_enum_2.BenefitStatus.PENDING;
        await record.save();
        return { record };
    }
    async validatePhase0() {
        const signingBonuses = await this.signingBonusModel.find();
        const exitBenefits = await this.exitBenefitsModel.find();
        const pending = [
            ...signingBonuses.filter(b => b.status == payroll_execution_enum_1.BonusStatus.PENDING),
            ...exitBenefits.filter(e => e.status == payroll_execution_enum_2.BenefitStatus.PENDING),
        ];
        if (pending.length > 0) {
            return {
                ready: false,
                pendingItems: pending,
                message: 'Phase 0 not completed. Some items are unmarked.',
            };
        }
        return {
            ready: true,
            message: 'Phase 0 completed, payroll can be initiated.',
        };
    }
    async updatePayrollPeriod(dto) {
        const { payrollRunId, payrollPeriod } = dto;
        const run = await this.payrollRuns.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_3.PayRollStatus.DRAFT) {
            throw new common_1.BadRequestException('Cannot update payroll period. Only draft payroll runs can be edited.');
        }
        run.payrollPeriod = new Date(payrollPeriod);
        await run.save();
        return {
            message: 'Payroll period updated successfully. Ready for frontend approval again.',
            payrollRun: run,
        };
    }
    async startPayrollInitiation(dto) {
        const { payrollRunId, payrollSpecialistId } = dto;
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_3.PayRollStatus.DRAFT) {
            throw new common_1.BadRequestException('Cannot start payroll initiation. Period must be approved by frontend and set to DRAFT.');
        }
        run.employees = 0;
        run.totalnetpay = 0;
        run.exceptions = 0;
        run.payrollSpecialistId = payrollSpecialistId;
        run.status = payroll_execution_enum_3.PayRollStatus.DRAFT;
        run.paymentStatus = payroll_execution_enum_3.PayRollPaymentStatus.PENDING;
        await run.save();
        return {
            message: 'Payroll initiation started. Draft shell created. Ready for Phase 1.1.',
            payrollRun: run,
        };
    }
};
exports.PayrollExecutionService = PayrollExecutionService;
exports.PayrollExecutionService = PayrollExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('employeeSigningBonus')),
    __param(1, (0, mongoose_1.InjectModel)('EmployeeTerminationResignation')),
    __param(2, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(3, (0, mongoose_1.InjectModel)('employeePayrollDetails')),
    __param(4, (0, mongoose_1.InjectModel)('EmployeeProfile')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollExecutionService);
//# sourceMappingURL=payroll-execution.service.js.map