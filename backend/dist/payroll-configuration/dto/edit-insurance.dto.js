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
exports.editInsuranceBracketsDTO = void 0;
const class_validator_1 = require("class-validator");
const payroll_configuration_enums_1 = require("../enums/payroll-configuration-enums");
class editInsuranceBracketsDTO {
    name;
    amount;
    status;
    minSalary;
    maxSalary;
    EmployeeRate;
    EmployerRate;
}
exports.editInsuranceBracketsDTO = editInsuranceBracketsDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], editInsuranceBracketsDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], editInsuranceBracketsDTO.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payroll_configuration_enums_1.ConfigStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], editInsuranceBracketsDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], editInsuranceBracketsDTO.prototype, "minSalary", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], editInsuranceBracketsDTO.prototype, "maxSalary", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], editInsuranceBracketsDTO.prototype, "EmployeeRate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], editInsuranceBracketsDTO.prototype, "EmployerRate", void 0);
//# sourceMappingURL=edit-insurance.dto.js.map