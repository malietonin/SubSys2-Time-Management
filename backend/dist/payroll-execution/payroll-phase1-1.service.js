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
exports.PayrollPhase1_1Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
let PayrollPhase1_1Service = class PayrollPhase1_1Service {
    payrollRunsModel;
    employeeDetailsModel;
    employeeProfileModel;
    constructor(payrollRunsModel, employeeDetailsModel, employeeProfileModel) {
        this.payrollRunsModel = payrollRunsModel;
        this.employeeDetailsModel = employeeDetailsModel;
        this.employeeProfileModel = employeeProfileModel;
    }
    async generatePayrollDraft(dto) {
        const { payrollRunId, payrollSpecialistId } = dto;
        const run = await this.payrollRunsModel.findById(payrollRunId);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        if (run.status !== payroll_execution_enum_1.PayRollStatus.DRAFT) {
            throw new common_1.BadRequestException('Payroll draft can only be generated when payroll run is in DRAFT status.');
        }
        const employees = await this.employeeProfileModel.find({ contractStatus: 'active' });
        if (!employees.length) {
            throw new common_1.BadRequestException('No active employees found for payroll.');
        }
        let totalNetPay = 0;
        let exceptionsCount = 0;
        const detailsArray = [];
        for (const emp of employees) {
            let baseSalary = emp.baseSalary ?? 0;
            let allowances = emp.allowancesTotal ?? 0;
            if (['expired', 'inactive', 'suspended'].includes(emp.contractStatus)) {
                exceptionsCount++;
                detailsArray.push({
                    employeeId: emp._id,
                    baseSalary: 0,
                    allowances: 0,
                    deductions: 0,
                    netSalary: 0,
                    netPay: 0,
                    bankStatus: 'missing',
                    exceptions: 'Contract inactive or invalid',
                    payrollRunId: run._id,
                });
                continue;
            }
            const tax = baseSalary * 0.10;
            const insurance = baseSalary * 0.05;
            const penalty = emp.penaltiesTotal ?? 0;
            const gross = baseSalary + allowances;
            const deductions = tax + insurance + penalty;
            const netSalary = gross - deductions;
            const netPay = netSalary;
            totalNetPay += netPay;
            detailsArray.push({
                employeeId: emp._id,
                baseSalary,
                allowances,
                deductions,
                netSalary,
                netPay,
                bankStatus: emp.bankAccount ? 'valid' : 'missing',
                exceptions: emp.bankAccount ? null : 'Missing bank account',
                payrollRunId: run._id,
            });
        }
        await this.employeeDetailsModel.insertMany(detailsArray);
        run.employees = employees.length;
        run.exceptions = exceptionsCount;
        run.totalnetpay = totalNetPay;
        run.status = payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW;
        run.payrollSpecialistId = payrollSpecialistId ? new mongoose_2.Types.ObjectId(payrollSpecialistId) : undefined;
        await run.save();
        return {
            message: 'Payroll draft generated successfully.',
            employeesProcessed: employees.length,
            exceptions: exceptionsCount,
            totalNetPay,
            runStatus: run.status,
        };
    }
};
exports.PayrollPhase1_1Service = PayrollPhase1_1Service;
exports.PayrollPhase1_1Service = PayrollPhase1_1Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('payrollRuns')),
    __param(1, (0, mongoose_1.InjectModel)('employeePayrollDetails')),
    __param(2, (0, mongoose_1.InjectModel)('EmployeeProfile')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase1_1Service);
//# sourceMappingURL=payroll-phase1-1.service.js.map