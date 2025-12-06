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
exports.PayrollTrackingController = void 0;
const common_1 = require("@nestjs/common");
const payroll_tracking_service_1 = require("./payroll-tracking.service");
const create_refund_dto_1 = require("./dto/create-refund.dto");
const create_claim_dto_1 = require("./dto/create-claim.dto");
const update_claim_status_dto_1 = require("./dto/update-claim-status.dto");
const create_dispute_dto_1 = require("./dto/create-dispute.dto");
const update_dispute_status_dto_1 = require("./dto/update-dispute-status.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
let PayrollTrackingController = class PayrollTrackingController {
    payrollTrackingService;
    constructor(payrollTrackingService) {
        this.payrollTrackingService = payrollTrackingService;
    }
    getMyClaims(employeeId) {
        return this.payrollTrackingService.getClaimsForEmployee(employeeId);
    }
    createClaim(dto) {
        return this.payrollTrackingService.createClaim(dto);
    }
    getMyDisputes(employeeId) {
        return this.payrollTrackingService.getDisputesForEmployee(employeeId);
    }
    createDispute(dto) {
        return this.payrollTrackingService.createDispute(dto);
    }
    getPendingClaims() {
        return this.payrollTrackingService.getPendingClaims();
    }
    approveClaim(claimId, dto) {
        return this.payrollTrackingService.updateClaimStatus(claimId, dto);
    }
    rejectClaim(claimId, dto) {
        return this.payrollTrackingService.updateClaimStatus(claimId, dto);
    }
    getPendingDisputes() {
        return this.payrollTrackingService.getPendingDisputes();
    }
    approveDispute(disputeId, dto) {
        return this.payrollTrackingService.updateDisputeStatus(disputeId, dto);
    }
    rejectDispute(disputeId, dto) {
        return this.payrollTrackingService.updateDisputeStatus(disputeId, dto);
    }
    createRefund(dto) {
        return this.payrollTrackingService.createRefund(dto);
    }
    updateRefund(refundId, dto) {
        return this.payrollTrackingService.updateRefundStatus(refundId, dto);
    }
    listRefunds() {
        return this.payrollTrackingService.getRefunds();
    }
};
exports.PayrollTrackingController = PayrollTrackingController;
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Get)('claims/me/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getMyClaims", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Post)('claims'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_claim_dto_1.CreateClaimDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "createClaim", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Get)('disputes/me/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getMyDisputes", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    (0, common_1.Post)('disputes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dispute_dto_1.CreateDisputeDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "createDispute", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Get)('claims/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getPendingClaims", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Patch)('claims/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_claim_status_dto_1.UpdateClaimStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "approveClaim", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Patch)('claims/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_claim_status_dto_1.UpdateClaimStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "rejectClaim", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Get)('disputes/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getPendingDisputes", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Patch)('disputes/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dispute_status_dto_1.UpdateDisputeStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "approveDispute", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Patch)('disputes/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dispute_status_dto_1.UpdateDisputeStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "rejectDispute", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    (0, common_1.Post)('refunds'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_refund_dto_1.CreateRefundDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "createRefund", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    (0, common_1.Patch)('refunds/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_refund_dto_1.UpdateRefundStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "updateRefund", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    (0, common_1.Get)('refunds'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "listRefunds", null);
exports.PayrollTrackingController = PayrollTrackingController = __decorate([
    (0, common_1.Controller)('payroll-tracking'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_tracking_service_1.PayrollTrackingService])
], PayrollTrackingController);
//# sourceMappingURL=payroll-tracking.controller.js.map