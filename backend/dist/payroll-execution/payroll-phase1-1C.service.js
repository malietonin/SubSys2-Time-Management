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
exports.PayrollPhase1_1CService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
let PayrollPhase1_1CService = class PayrollPhase1_1CService {
    payrollRunsModel;
    payrollDetailsModel;
    constructor(payrollRunsModel, payrollDetailsModel) {
        this.payrollRunsModel = payrollRunsModel;
        this.payrollDetailsModel = payrollDetailsModel;
    }
    async generateDraftFile(dto) {
        const { payrollRunId, format = 'csv' } = dto;
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException('Draft file can only be generated while payroll is in UNDER_REVIEW status.');
        }
        const details = await this.payrollDetailsModel.find({ payrollRunId });
        if (!details.length) {
            throw new common_1.BadRequestException('No payroll details found. Run Phase 1.1.B first.');
        }
        if (format === 'csv') {
            return this.generateCSV(details, run);
        }
        if (format === 'xlsx') {
            return {
                message: 'XLSX export not implemented yet. Use CSV.',
            };
        }
        throw new common_1.BadRequestException('Unsupported file format.');
    }
    generateCSV(details, run) {
        const header = [
            'Employee ID',
            'Base Salary',
            'Allowances',
            'Deductions',
            'Net Salary',
            'Bonus',
            'Benefit',
            'Bank Status',
            'Exception',
        ];
        const rows = details.map((d) => [
            d.employeeId,
            d.baseSalary,
            d.allowances,
            d.deductions,
            d.netSalary,
            d.bonus,
            d.benefit,
            d.bankStatus,
            d.exceptions ?? '',
        ]);
        const csvString = header.join(',') +
            '\n' +
            rows.map((r) => r.join(',')).join('\n');
        return {
            message: 'Payroll draft CSV generated successfully.',
            payrollRunId: run._id,
            fileName: `payroll-draft-${run._id}.csv`,
            contentType: 'text/csv',
            data: csvString,
        };
    }
};
exports.PayrollPhase1_1CService = PayrollPhase1_1CService;
exports.PayrollPhase1_1CService = PayrollPhase1_1CService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('payrollRuns')),
    __param(1, (0, mongoose_1.InjectModel)('employeePayrollDetails')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase1_1CService);
//# sourceMappingURL=payroll-phase1-1C.service.js.map