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
exports.updatePayrollPoliciesDto = void 0;
const class_validator_1 = require("class-validator");
const payroll_configuration_enums_1 = require("../enums/payroll-configuration-enums");
const payroll_configuration_enums_2 = require("../enums/payroll-configuration-enums");
const payroll_configuration_enums_3 = require("../enums/payroll-configuration-enums");
class updatePayrollPoliciesDto {
    policyName;
    policyType;
    description;
    effectiveDate;
    ruleDefinition;
    applicability;
    ConfigStatus;
}
exports.updatePayrollPoliciesDto = updatePayrollPoliciesDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], updatePayrollPoliciesDto.prototype, "policyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_1.PolicyType),
    __metadata("design:type", String)
], updatePayrollPoliciesDto.prototype, "policyType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], updatePayrollPoliciesDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], updatePayrollPoliciesDto.prototype, "effectiveDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], updatePayrollPoliciesDto.prototype, "ruleDefinition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_2.Applicability),
    __metadata("design:type", String)
], updatePayrollPoliciesDto.prototype, "applicability", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_3.ConfigStatus),
    __metadata("design:type", String)
], updatePayrollPoliciesDto.prototype, "ConfigStatus", void 0);
//# sourceMappingURL=update-policies.dto.js.map