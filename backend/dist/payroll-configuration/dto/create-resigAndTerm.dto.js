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
exports.createResigAndTerminBenefitsDTO = void 0;
const class_validator_1 = require("class-validator");
const payroll_configuration_enums_1 = require("../enums/payroll-configuration-enums");
class createResigAndTerminBenefitsDTO {
    name;
    amount;
    terms;
    status;
}
exports.createResigAndTerminBenefitsDTO = createResigAndTerminBenefitsDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createResigAndTerminBenefitsDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], createResigAndTerminBenefitsDTO.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], createResigAndTerminBenefitsDTO.prototype, "terms", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_1.ConfigStatus),
    __metadata("design:type", String)
], createResigAndTerminBenefitsDTO.prototype, "status", void 0);
//# sourceMappingURL=create-resigAndTerm.dto.js.map