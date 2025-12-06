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
exports.claimsSchema = exports.Claims = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_profile_schema_1 = require("../../employee-profile/models/employee-profile.schema");
const payroll_tracking_enum_1 = require("../enums/payroll-tracking-enum");
let Claims = class Claims {
    claimId;
    description;
    claimType;
    employeeId;
    financeStaffId;
    amount;
    approvedAmount;
    status;
    rejectionReason;
    resolutionComment;
};
exports.Claims = Claims;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Claims.prototype, "claimId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Claims.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Claims.prototype, "claimType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: employee_profile_schema_1.EmployeeProfile.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Claims.prototype, "employeeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: employee_profile_schema_1.EmployeeProfile.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Claims.prototype, "financeStaffId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Claims.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Claims.prototype, "approvedAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: Object.values(payroll_tracking_enum_1.ClaimStatus),
        default: payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW,
    }),
    __metadata("design:type", String)
], Claims.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Claims.prototype, "rejectionReason", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Claims.prototype, "resolutionComment", void 0);
exports.Claims = Claims = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'claims' })
], Claims);
exports.claimsSchema = mongoose_1.SchemaFactory.createForClass(Claims);
//# sourceMappingURL=claims.schema.js.map