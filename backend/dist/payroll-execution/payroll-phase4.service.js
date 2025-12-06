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
exports.PayrollPhase4Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payslip_schema_1 = require("./models/payslip.schema");
const employeePayrollDetails_schema_1 = require("./models/employeePayrollDetails.schema");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
let PayrollPhase4Service = class PayrollPhase4Service {
    payslipModel;
    employeeDetailsModel;
    payrollRunsModel;
    constructor(payslipModel, employeeDetailsModel, payrollRunsModel) {
        this.payslipModel = payslipModel;
        this.employeeDetailsModel = employeeDetailsModel;
        this.payrollRunsModel = payrollRunsModel;
    }
    async generatePayslips(dto) {
        const { payrollRunId } = dto;
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.LOCKED) {
            throw new common_1.BadRequestException('Payslips can only be generated after payroll run is LOCKED.');
        }
        if (run.paymentStatus !== payroll_execution_enum_1.PayRollPaymentStatus.PAID) {
            throw new common_1.BadRequestException('Payslips can only be generated after payroll disbursements are marked PAID.');
        }
        const employeeRecords = await this.employeeDetailsModel.find({
            payrollRunId: run._id,
        });
        if (employeeRecords.length === 0) {
            throw new common_1.BadRequestException('No employee payroll data found for this run.');
        }
        const payslipResults = [];
        for (const rec of employeeRecords) {
            const exists = await this.payslipModel.findOne({
                employeeId: rec.employeeId,
                payrollRunId: run._id,
            });
            if (exists) {
                payslipResults.push({
                    employeeId: rec.employeeId,
                    status: 'already_generated',
                });
                continue;
            }
            const payslip = await this.payslipModel.create({
                employeeId: rec.employeeId,
                payrollRunId: run._id,
                baseSalary: rec.baseSalary,
                allowances: rec.allowances,
                deductions: rec.deductions,
                netSalary: rec.netSalary,
                netPay: rec.netPay,
                paymentStatus: payroll_execution_enum_1.PaySlipPaymentStatus.PAID,
            });
            payslipResults.push({
                employeeId: rec.employeeId,
                status: 'generated',
                payslipId: payslip._id,
            });
        }
        return {
            message: 'Payslips generated successfully.',
            payrollRunId,
            payslipsGenerated: payslipResults.length,
            details: payslipResults,
        };
    }
};
exports.PayrollPhase4Service = PayrollPhase4Service;
exports.PayrollPhase4Service = PayrollPhase4Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payslip_schema_1.paySlip.name)),
    __param(1, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __param(2, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase4Service);
//# sourceMappingURL=payroll-phase4.service.js.map