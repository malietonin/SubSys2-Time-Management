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
var PayrollPhase2Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollPhase2Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
let PayrollPhase2Service = PayrollPhase2Service_1 = class PayrollPhase2Service {
    detailsModel;
    payrollRunsModel;
    employeeModel;
    logger = new common_1.Logger(PayrollPhase2Service_1.name);
    constructor(detailsModel, payrollRunsModel, employeeModel) {
        this.detailsModel = detailsModel;
        this.payrollRunsModel = payrollRunsModel;
        this.employeeModel = employeeModel;
    }
    async reviewPayrollDraft(dto) {
        const { payrollRunId, payrollSpecialistId, spikeThreshold = 1.5 } = dto;
        if (!payrollRunId)
            throw new common_1.BadRequestException('payrollRunId is required.');
        const runIdObj = mongoose_2.Types.ObjectId.isValid(payrollRunId)
            ? new mongoose_2.Types.ObjectId(payrollRunId)
            : null;
        if (!runIdObj)
            throw new common_1.BadRequestException('Invalid payrollRunId.');
        const run = await this.payrollrollFindByIdSafe(runIdObj);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found.');
        const details = await this.detailsModel.find({ payrollRunId: run._id }).lean();
        if (!details || details.length === 0) {
            run.exceptions = 0;
            run.status = payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW;
            await run.save();
            return {
                message: 'No employee payroll details found for this run. Marked as UNDER_REVIEW.',
                employeesProcessed: 0,
                exceptionsCount: 0,
            };
        }
        const bulkOps = [];
        let exceptionsCount = 0;
        let totalNetPay = 0;
        for (const det of details) {
            const reasons = [];
            if (!det.bankStatus || det.bankStatus.toString().toLowerCase() === 'missing') {
                reasons.push('Missing bank account');
            }
            if (typeof det.netPay === 'number' && det.netPay < 0) {
                reasons.push('Negative net pay');
            }
            const baseSalary = Number(det.baseSalary ?? 0);
            const allowances = Number(det.allowances ?? 0);
            const gross = baseSalary + allowances;
            if (gross === 0) {
                reasons.push('Zero gross salary');
            }
            let spikeFlag = false;
            try {
                const prev = await this.detailsModel
                    .findOne({ employeeId: det.employeeId, payrollRunId: { $ne: run._id } })
                    .sort({ createdAt: -1 })
                    .lean();
                if (prev && typeof prev.netPay === 'number' && prev.netPay > 0 && typeof det.netPay === 'number') {
                    const ratio = det.netPay / prev.netPay;
                    if (ratio >= spikeThreshold) {
                        spikeFlag = true;
                        reasons.push(`Net pay spike (x${ratio.toFixed(2)}) vs last run`);
                    }
                }
            }
            catch (err) {
                this.logger.warn(`Failed to lookup previous payroll detail for employee ${det.employeeId}: ${err.message}`);
            }
            const exceptionText = reasons.length ? reasons.join('; ') : null;
            if (exceptionText)
                exceptionsCount++;
            totalNetPay += Number(det.netPay ?? 0);
            bulkOps.push({
                updateOne: {
                    filter: { _id: det._id },
                    update: {
                        $set: {
                            exceptions: exceptionText,
                            bankStatus: det.bankStatus ?? (exceptionText?.includes('Missing bank account') ? 'missing' : det.bankStatus),
                        },
                    },
                },
            });
        }
        if (bulkOps.length > 0) {
            await this.detailsModel.bulkWrite(bulkOps);
        }
        run.exceptions = exceptionsCount;
        run.totalnetpay = totalNetPay;
        run.status = payroll_execution_enum_1.PayRollStatus.UNDER_REVIEW;
        if (payrollSpecialistId && mongoose_2.Types.ObjectId.isValid(payrollSpecialistId)) {
            run.payrollSpecialistId = new mongoose_2.Types.ObjectId(payrollSpecialistId);
        }
        await run.save();
        return {
            message: 'Payroll draft reviewed. Exceptions flagged where applicable.',
            payrollRunId: run._id,
            employeesProcessed: details.length,
            exceptionsCount,
            totalNetPay,
        };
    }
    async payrollrollFindByIdSafe(id) {
        return this.payrollRunsModel.findById(id);
    }
};
exports.PayrollPhase2Service = PayrollPhase2Service;
exports.PayrollPhase2Service = PayrollPhase2Service = PayrollPhase2Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('employeePayrollDetails')),
    __param(1, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(2, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollPhase2Service);
//# sourceMappingURL=payroll-phase2.service.js.map