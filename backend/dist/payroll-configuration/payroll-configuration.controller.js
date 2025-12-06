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
exports.PayrollConfigurationController = void 0;
const common_1 = require("@nestjs/common");
const payroll_configuration_service_1 = require("./payroll-configuration.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
const update_policies_dto_1 = require("./dto/update-policies.dto");
const create_policies_dto_1 = require("./dto/create-policies.dto");
const create_resigAndTerm_dto_1 = require("./dto/create-resigAndTerm.dto");
const create_insurance_dto_1 = require("./dto/create-insurance.dto");
const edit_insurance_dto_1 = require("./dto/edit-insurance.dto");
const create_company_settings_dto_1 = require("./dto/create-company-settings.dto");
const UpdateCompanySettings_dto_1 = require("./dto/UpdateCompanySettings.dto");
const approval_dto_1 = require("./dto/approval.dto");
const create_tax_rules_dto_1 = require("./dto/create-tax-rules.dto");
const edit_tax_rules_dto_1 = require("./dto/edit-tax-rules.dto");
let PayrollConfigurationController = class PayrollConfigurationController {
    payrollConfigurationService;
    constructor(payrollConfigurationService) {
        this.payrollConfigurationService = payrollConfigurationService;
    }
    async getAllPolicies() {
        return this.payrollConfigurationService.findAllPolicies();
    }
    async getPolicyById(id) {
        return this.payrollConfigurationService.findById(id);
    }
    async createPolicy(policyData) {
        return this.payrollConfigurationService.createPolicy(policyData);
    }
    async updatePolicy(id, updateData) {
        return this.payrollConfigurationService.updatePolicy(id, updateData);
    }
    async deletePolicy(id) {
        return this.payrollConfigurationService.deletePolicy(id);
    }
    async findInsuranceBracket(id) {
        return this.payrollConfigurationService.findInsuranceBrackets(id);
    }
    async createInsuranceBracket(bracketData) {
        return this.payrollConfigurationService.createInsuranceBrackets(bracketData);
    }
    async editInsuranceBracket(id, updateData) {
        return this.payrollConfigurationService.editInsuranceBrackets(id, updateData);
    }
    async removeInsuranceBracket(id) {
        return this.payrollConfigurationService.removeInsuranceBrackets(id);
    }
    async approvePayrollConfig(model, id) {
        return this.payrollConfigurationService.payrollManagerApprove(model, id);
    }
    async rejectPayrollConfig(model, id) {
        return this.payrollConfigurationService.payrollManagerReject(model, id);
    }
    async approveInsurance(id) {
        return this.payrollConfigurationService.hrApproveInsurance(id);
    }
    async rejectInsurance(id) {
        return this.payrollConfigurationService.hrRejectInsurance(id);
    }
    createSettings(dto) {
        return this.payrollConfigurationService.create(dto);
    }
    getAllSettings() {
        return this.payrollConfigurationService.findAll();
    }
    getSettings(id) {
        return this.payrollConfigurationService.findOne(id);
    }
    updateSettings(id, dto) {
        return this.payrollConfigurationService.update(id, dto);
    }
    deleteSettings(id) {
        return this.payrollConfigurationService.delete(id);
    }
    approveOrReject(dto) {
        return this.payrollConfigurationService.approveOrReject(dto);
    }
    async getAllTaxRules() {
        return this.payrollConfigurationService.findAllTaxRules();
    }
    async getTaxRuleById(id) {
        return this.payrollConfigurationService.findTaxRuleById(id);
    }
    async createTaxRule(taxRuleData) {
        return this.payrollConfigurationService.createTaxRule(taxRuleData);
    }
    async updateTaxRule(id, updateData) {
        return this.payrollConfigurationService.updateTaxRule(id, updateData);
    }
    async deleteTaxRule(id) {
        return this.payrollConfigurationService.deleteTaxRule(id);
    }
    async getAllTerminationAndResignationBenefits() {
        return this.payrollConfigurationService.getAllTerminationAndResignationBenefits();
    }
    async getTerminationAndResignationBenefitById(id) {
        return this.payrollConfigurationService.getTerminationAndResignationBenefitById(id);
    }
    async createTerminationAndResignationBenefit(benefitsData) {
        return this.payrollConfigurationService.createTerminationAndResignationBenefit(benefitsData);
    }
    async updateTerminationAndResignationBenefit(id, updateData) {
        return this.payrollConfigurationService.updateTerminationAndResignationBenefit(id, updateData);
    }
    async deleteTerminationAndResignationBenefit(id) {
        return this.payrollConfigurationService.deleteTerminationAndResignationBenefit(id);
    }
    async backupPayrollData() {
        return this.payrollConfigurationService.backupPayrollData();
    }
};
exports.PayrollConfigurationController = PayrollConfigurationController;
__decorate([
    (0, common_1.Get)('policies'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "getAllPolicies", null);
__decorate([
    (0, common_1.Get)('policies/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "getPolicyById", null);
__decorate([
    (0, common_1.Post)('policies'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_policies_dto_1.createPayrollPoliciesDto]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Put)('policies/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_policies_dto_1.updatePayrollPoliciesDto]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "updatePolicy", null);
__decorate([
    (0, common_1.Delete)('policies/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "deletePolicy", null);
__decorate([
    (0, common_1.Get)('insurance-brackets/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "findInsuranceBracket", null);
__decorate([
    (0, common_1.Post)('insurance-brackets'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_insurance_dto_1.createInsuranceBracketsDTO]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "createInsuranceBracket", null);
__decorate([
    (0, common_1.Put)('insurance-brackets/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_insurance_dto_1.editInsuranceBracketsDTO]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "editInsuranceBracket", null);
__decorate([
    (0, common_1.Delete)('insurance-brackets/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "removeInsuranceBracket", null);
__decorate([
    (0, common_1.Post)('approve/payroll/:model/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('model')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "approvePayrollConfig", null);
__decorate([
    (0, common_1.Post)('reject/payroll/:model/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    __param(0, (0, common_1.Param)('model')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "rejectPayrollConfig", null);
__decorate([
    (0, common_1.Post)('approve/insurance/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "approveInsurance", null);
__decorate([
    (0, common_1.Post)('reject/insurance/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "rejectInsurance", null);
__decorate([
    (0, common_1.Post)('company-settings'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_settings_dto_1.CreateCompanySettingsDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createSettings", null);
__decorate([
    (0, common_1.Get)('company-settings'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getAllSettings", null);
__decorate([
    (0, common_1.Get)('company-settings/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)('company-settings/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateCompanySettings_dto_1.UpdateCompanySettingsDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Delete)('company-settings/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "deleteSettings", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER, employee_profile_enums_1.SystemRole.HR_MANAGER),
    (0, common_1.Post)('approval'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approval_dto_1.ApprovalDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "approveOrReject", null);
__decorate([
    (0, common_1.Get)('tax-rules'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "getAllTaxRules", null);
__decorate([
    (0, common_1.Get)('tax-rules/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "getTaxRuleById", null);
__decorate([
    (0, common_1.Post)('tax-rules'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tax_rules_dto_1.createTaxRulesDTO]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "createTaxRule", null);
__decorate([
    (0, common_1.Put)('tax-rules/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_tax_rules_dto_1.editTaxRulesDTO]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "updateTaxRule", null);
__decorate([
    (0, common_1.Delete)('tax-rules/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.LEGAL_POLICY_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "deleteTaxRule", null);
__decorate([
    (0, common_1.Get)('termination-resignation-benefits'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "getAllTerminationAndResignationBenefits", null);
__decorate([
    (0, common_1.Get)('termination-resignation-benefits/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "getTerminationAndResignationBenefitById", null);
__decorate([
    (0, common_1.Post)('termination-resignation-benefits'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resigAndTerm_dto_1.createResigAndTerminBenefitsDTO]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "createTerminationAndResignationBenefit", null);
__decorate([
    (0, common_1.Put)('termination-resignation-benefits/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_resigAndTerm_dto_1.createResigAndTerminBenefitsDTO]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "updateTerminationAndResignationBenefit", null);
__decorate([
    (0, common_1.Delete)('termination-resignation-benefits/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "deleteTerminationAndResignationBenefit", null);
__decorate([
    (0, common_1.Post)('backup'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollConfigurationController.prototype, "backupPayrollData", null);
exports.PayrollConfigurationController = PayrollConfigurationController = __decorate([
    (0, common_1.Controller)('payroll-configuration'),
    __metadata("design:paramtypes", [payroll_configuration_service_1.PayrollConfigurationService])
], PayrollConfigurationController);
//# sourceMappingURL=payroll-configuration.controller.js.map