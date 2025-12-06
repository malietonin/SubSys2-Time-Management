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
exports.PayrollTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const claims_schema_1 = require("./models/claims.schema");
const disputes_schema_1 = require("./models/disputes.schema");
const refunds_schema_1 = require("./models/refunds.schema");
const payroll_tracking_enum_1 = require("./enums/payroll-tracking-enum");
let PayrollTrackingService = class PayrollTrackingService {
    claimModel;
    disputeModel;
    refundModel;
    constructor(claimModel, disputeModel, refundModel) {
        this.claimModel = claimModel;
        this.disputeModel = disputeModel;
        this.refundModel = refundModel;
    }
    async generateClaimId() {
        const count = await this.claimModel.countDocuments();
        const next = (count + 1).toString().padStart(4, '0');
        return `CLAIM-${next}`;
    }
    async getClaimsForEmployee(employeeId) {
        const objectId = new mongoose_2.Types.ObjectId(employeeId);
        return this.claimModel.find({ employeeId: objectId }).exec();
    }
    async createClaim(dto) {
        const objectId = new mongoose_2.Types.ObjectId(dto.employeeId);
        const claimId = await this.generateClaimId();
        const created = new this.claimModel({
            claimId,
            description: dto.description,
            claimType: dto.claimType,
            amount: dto.amount,
            employeeId: objectId,
            status: payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW,
        });
        return created.save();
    }
    async getPendingClaims() {
        return this.claimModel
            .find({ status: payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW })
            .exec();
    }
    async updateClaimStatus(claimMongoId, dto) {
        return this.claimModel.findByIdAndUpdate(claimMongoId, {
            status: dto.status,
            resolutionComment: dto.resolutionComment,
            updatedAt: new Date(),
        }, { new: true });
    }
    async getDisputesForEmployee(employeeId) {
        const objectId = new mongoose_2.Types.ObjectId(employeeId);
        return this.disputeModel.find({ employeeId: objectId }).exec();
    }
    async createDispute(dto) {
        const created = new this.disputeModel({
            ...dto,
            status: payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW,
        });
        return created.save();
    }
    async getPendingDisputes() {
        return this.disputeModel
            .find({ status: payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW })
            .exec();
    }
    async updateDisputeStatus(disputeMongoId, dto) {
        return this.disputeModel.findByIdAndUpdate(disputeMongoId, {
            status: dto.status,
            resolutionComment: dto.resolutionComment,
            updatedAt: new Date(),
        }, { new: true });
    }
    async createRefund(dto) {
        const objectId = new mongoose_2.Types.ObjectId(dto.employeeId);
        const created = new this.refundModel({
            refundDetails: dto.refundDetails,
            employeeId: objectId,
            status: payroll_tracking_enum_1.RefundStatus.PENDING,
        });
        return created.save();
    }
    async updateRefundStatus(refundMongoId, dto) {
        const updateData = {
            status: dto.status,
            updatedAt: new Date(),
        };
        if (dto.financeStaffId) {
            updateData.financeStaffId = new mongoose_2.Types.ObjectId(dto.financeStaffId);
        }
        if (dto.paidInPayrollRunId) {
            updateData.paidInPayrollRunId = dto.paidInPayrollRunId;
        }
        return this.refundModel.findByIdAndUpdate(refundMongoId, updateData, { new: true });
    }
    async getRefunds() {
        return this.refundModel.find().exec();
    }
};
exports.PayrollTrackingService = PayrollTrackingService;
exports.PayrollTrackingService = PayrollTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(claims_schema_1.Claims.name)),
    __param(1, (0, mongoose_1.InjectModel)(disputes_schema_1.disputes.name)),
    __param(2, (0, mongoose_1.InjectModel)(refunds_schema_1.refunds.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollTrackingService);
//# sourceMappingURL=payroll-tracking.service.js.map