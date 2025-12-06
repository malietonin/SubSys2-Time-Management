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
var LeaveTrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_entitlement_schema_1 = require("../models/leave-entitlement.schema");
const leave_policy_schema_1 = require("../models/leave-policy.schema");
const adjustment_type_enum_1 = require("../enums/adjustment-type.enum");
const accrual_method_enum_1 = require("../enums/accrual-method.enum");
const rounding_rule_enum_1 = require("../enums/rounding-rule.enum");
let LeaveTrackingService = LeaveTrackingService_1 = class LeaveTrackingService {
    entitlementModel;
    policyModel;
    logger = new common_1.Logger(LeaveTrackingService_1.name);
    constructor(entitlementModel, policyModel) {
        this.entitlementModel = entitlementModel;
        this.policyModel = policyModel;
    }
    async accrueEntitlements() {
        const entitlements = await this.entitlementModel.find();
        let processed = 0;
        for (const ent of entitlements) {
            const policy = await this.policyModel.findOne({
                leaveTypeId: ent.leaveTypeId,
            });
            if (!policy)
                continue;
            let accrual = 0;
            switch (policy.accrualMethod) {
                case accrual_method_enum_1.AccrualMethod.MONTHLY:
                    accrual =
                        policy.monthlyRate ??
                            (policy.yearlyRate ? policy.yearlyRate / 12 : 0);
                    break;
                case accrual_method_enum_1.AccrualMethod.YEARLY:
                    accrual = policy.yearlyRate ? policy.yearlyRate / 12 : 0;
                    break;
                default:
                    accrual = 0;
            }
            switch (policy.roundingRule) {
                case rounding_rule_enum_1.RoundingRule.ROUND:
                    accrual = Math.round(accrual);
                    break;
                case rounding_rule_enum_1.RoundingRule.ROUND_UP:
                    accrual = Math.ceil(accrual);
                    break;
                case rounding_rule_enum_1.RoundingRule.ROUND_DOWN:
                    accrual = Math.floor(accrual);
                    break;
            }
            if (accrual <= 0)
                continue;
            await this.entitlementModel.updateOne({ _id: ent._id }, {
                $inc: {
                    accruedActual: accrual,
                    accruedRounded: accrual,
                    remaining: accrual,
                },
                $set: { lastAccrualDate: new Date() },
                $push: {
                    auditLogs: {
                        action: 'Accrual',
                        type: adjustment_type_enum_1.AdjustmentType.ADD,
                        amount: accrual,
                        by: 'system',
                        timestamp: new Date(),
                        reason: 'Monthly Accrual',
                    },
                },
            });
            processed++;
        }
        return { processed };
    }
    async accrueLeave() {
        return this.accrueEntitlements();
    }
    async adjustLeave(dto) {
        const entitlement = await this.entitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveType),
        });
        if (!entitlement) {
            throw new Error('Entitlement not found for this employee & leave type.');
        }
        const diff = dto.newBalance - entitlement.remaining;
        const type = diff >= 0 ? adjustment_type_enum_1.AdjustmentType.ADD : adjustment_type_enum_1.AdjustmentType.DEDUCT;
        await this.entitlementModel.updateOne({ _id: entitlement._id }, {
            $set: { remaining: dto.newBalance },
            $push: {
                auditLogs: {
                    action: 'Manual Adjustment',
                    type,
                    amount: Math.abs(diff),
                    by: dto.hrId,
                    reason: dto.reason,
                    timestamp: new Date(),
                },
            },
        });
        return { message: 'Leave balance adjusted successfully' };
    }
    async yearEndProcessing() {
        const entitlements = await this.entitlementModel.find();
        let processed = 0;
        for (const ent of entitlements) {
            const carryForward = Math.min(ent.remaining, 5);
            const newRemaining = ent.yearlyEntitlement + carryForward;
            await this.entitlementModel.updateOne({ _id: ent._id }, {
                $set: {
                    carryForward,
                    accruedActual: 0,
                    accruedRounded: 0,
                    remaining: newRemaining,
                    nextResetDate: new Date(new Date().getFullYear() + 1, 0, 1),
                },
                $push: {
                    auditLogs: {
                        action: 'Year-End Reset',
                        type: adjustment_type_enum_1.AdjustmentType.ADD,
                        amount: newRemaining,
                        by: 'system',
                        timestamp: new Date(),
                        reason: 'Annual leave reset',
                    },
                },
            });
            processed++;
        }
        return { message: 'Year-end reset completed', processed };
    }
    async calculateEncashment(employeeId, dailySalary) {
        const entitlements = await this.entitlementModel.find({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        });
        let totalEncashableDays = 0;
        for (const ent of entitlements) {
            const encashable = Math.max(0, ent.remaining - 10);
            totalEncashableDays += encashable;
        }
        return {
            employeeId,
            totalEncashableDays,
            dailySalary,
            payout: totalEncashableDays * dailySalary,
        };
    }
    async createEntitlementForEmployee(employee) {
        const leaveTypes = await this.policyModel.find().distinct('leaveTypeId');
        const entitlements = leaveTypes.map((lt) => ({
            employeeId: new mongoose_2.Types.ObjectId(employee._id),
            leaveTypeId: new mongoose_2.Types.ObjectId(lt),
            yearlyEntitlement: 21,
            accruedActual: 0,
            accruedRounded: 0,
            carryForward: 0,
            taken: 0,
            pending: 0,
            remaining: 21,
            lastAccrualDate: null,
            nextResetDate: null,
        }));
        return this.entitlementModel.insertMany(entitlements);
    }
    async createSingleEntitlement(employeeId, leaveTypeId) {
        const exists = await this.entitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
        });
        if (exists)
            return exists;
        return this.entitlementModel.create({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
            yearlyEntitlement: 21,
            accruedActual: 0,
            accruedRounded: 0,
            carryForward: 0,
            taken: 0,
            pending: 0,
            remaining: 21,
            lastAccrualDate: null,
            nextResetDate: null,
        });
    }
    async getLeaveBalances(employeeId) {
        return this.entitlementModel
            .find({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        })
            .populate('leaveTypeId')
            .lean()
            .exec();
    }
};
exports.LeaveTrackingService = LeaveTrackingService;
exports.LeaveTrackingService = LeaveTrackingService = LeaveTrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_entitlement_schema_1.LeaveEntitlement.name)),
    __param(1, (0, mongoose_1.InjectModel)(leave_policy_schema_1.LeavePolicy.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LeaveTrackingService);
//# sourceMappingURL=leave-tracking.service.js.map