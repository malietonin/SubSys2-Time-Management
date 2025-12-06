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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRefundStatusDto = exports.CreateRefundDto = exports.RefundDetailsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const payroll_tracking_enum_1 = require("../enums/payroll-tracking-enum");
class RefundDetailsDto {
    description;
    amount;
}
exports.RefundDetailsDto = RefundDetailsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundDetailsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefundDetailsDto.prototype, "amount", void 0);
class CreateRefundDto {
    claimId;
    disputeId;
    employeeId;
    refundDetails;
}
exports.CreateRefundDto = CreateRefundDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateRefundDto.prototype, "claimId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateRefundDto.prototype, "disputeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateRefundDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RefundDetailsDto),
    __metadata("design:type", RefundDetailsDto)
], CreateRefundDto.prototype, "refundDetails", void 0);
class UpdateRefundStatusDto {
    status;
    financeStaffId;
    paidInPayrollRunId;
}
exports.UpdateRefundStatusDto = UpdateRefundStatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(payroll_tracking_enum_1.RefundStatus),
    __metadata("design:type", String)
], UpdateRefundStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateRefundStatusDto.prototype, "financeStaffId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateRefundStatusDto.prototype, "paidInPayrollRunId", void 0);
//# sourceMappingURL=create-refund.dto.js.map