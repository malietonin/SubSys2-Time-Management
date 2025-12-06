"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Mongoose = __importStar(require("mongoose"));
const allowance_schema_1 = require("./models/allowance.schema");
const CompanyWideSettings_schema_1 = require("./models/CompanyWideSettings.schema");
const insuranceBrackets_schema_1 = require("./models/insuranceBrackets.schema");
const payGrades_schema_1 = require("./models/payGrades.schema");
const payrollPolicies_schema_1 = require("./models/payrollPolicies.schema");
const payType_schema_1 = require("./models/payType.schema");
const signingBonus_schema_1 = require("./models/signingBonus.schema");
const taxRules_schema_1 = require("./models/taxRules.schema");
const terminationAndResignationBenefits_1 = require("./models/terminationAndResignationBenefits");
let PayrollConfigurationService = class PayrollConfigurationService {
    payrollPoliciesModel;
    payGradeModel;
    allowanceModel;
    companyWideSettingsModel;
    insuranceBracketsModel;
    payTypeModel;
    signingBonusModel;
    taxRulesModel;
    terminationAndResignationBenefitsModel;
    constructor(payrollPoliciesModel, payGradeModel, allowanceModel, companyWideSettingsModel, insuranceBracketsModel, payTypeModel, signingBonusModel, taxRulesModel, terminationAndResignationBenefitsModel) {
        this.payrollPoliciesModel = payrollPoliciesModel;
        this.payGradeModel = payGradeModel;
        this.allowanceModel = allowanceModel;
        this.companyWideSettingsModel = companyWideSettingsModel;
        this.insuranceBracketsModel = insuranceBracketsModel;
        this.payTypeModel = payTypeModel;
        this.signingBonusModel = signingBonusModel;
        this.taxRulesModel = taxRulesModel;
        this.terminationAndResignationBenefitsModel = terminationAndResignationBenefitsModel;
    }
    async findAllPolicies() {
        return this.payrollPoliciesModel.find().exec();
    }
    async findById(id) {
        return await this.payrollPoliciesModel.findById(id).exec();
    }
    async createPolicy(policyData) {
        const newPolicy = new this.payrollPoliciesModel(policyData);
        return newPolicy.save();
    }
    async updatePolicy(id, updateData) {
        return await this.payrollPoliciesModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async deletePolicy(id) {
        return await this.payrollPoliciesModel.findByIdAndDelete(id);
    }
    async getPayGrade(id) {
        return await this.payGradeModel.findById({ id });
    }
    async AddPayGrade(pg) {
        const newpg = new this.payGradeModel(payGrades_schema_1.payGrade);
        return newpg.save();
    }
    async editPayGrade(pg, updateData) {
        return await this.payGradeModel.findByIdAndUpdate(pg, updateData, { new: true });
    }
    async remove(pg) {
        return await this.payGradeModel.findByIdAndDelete(pg);
    }
    async calculateGrossSalary(payGradeId, allowanceId) {
        const payGrade = await this.payGradeModel.findById(payGradeId).exec();
        if (!payGrade)
            throw new Error('PayGrade not found');
        const allowance = await this.allowanceModel.findById(allowanceId).exec();
        if (!allowance)
            throw new Error('Allowance not found');
        const grossSalary = payGrade.baseSalary + allowance.amount;
        payGrade.grossSalary = grossSalary;
        await payGrade.save();
        return grossSalary;
    }
    async getPayTypes(id) {
        return await this.payTypeModel.findById(id);
    }
    async getAllPayTypes() {
        return await this.payTypeModel.find().exec();
    }
    async editPayTypes(pt, updateData) {
        return await this.payTypeModel.findByIdAndUpdate(pt, updateData, { new: true });
    }
    async createPayTypes(pt) {
        const newPayType = new this.payTypeModel(pt);
        return newPayType.save();
    }
    async removePayType(pt) {
        return await this.payTypeModel.findByIdAndDelete(pt);
    }
    async createAllowance(id) {
        const newAllowance = new this.allowanceModel(id);
        return newAllowance.save();
    }
    async getAllowance(id) {
        return await this.allowanceModel.findById(id);
    }
    async removeAllowance(id) {
        return await this.allowanceModel.findByIdAndDelete(id);
    }
    async findSigningBonuses(id) {
        return await this.signingBonusModel.findById(id);
    }
    async editsigningBonus(id, updateData) {
        return await this.signingBonusModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async createSigningBonuses(id) {
        const sb = new this.signingBonusModel(id);
        return sb.save();
    }
    async removeSigningBonuses(id) {
        return this.signingBonusModel.findByIdAndDelete(id);
    }
    async createTerminationAndResignationBenefits(id) {
        const newTerminationAndResignationBenefits = new this.terminationAndResignationBenefitsModel(id);
        return newTerminationAndResignationBenefits.save();
    }
    async removeTerminationAndResignationBenefits(id) {
        return await this.terminationAndResignationBenefitsModel.findByIdAndDelete(id);
    }
    async findAllTerminationAndResignationBenefits() {
        return this.terminationAndResignationBenefitsModel.find().exec();
    }
    async findTerminationAndResignationBenefitsById(id) {
        return await this.terminationAndResignationBenefitsModel.findById(id);
    }
    async updateTerminationAndResignationBenefits(id, updateData) {
        return await this.terminationAndResignationBenefitsModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async findInsuranceBrackets(id) {
        return await this.insuranceBracketsModel.findById(id);
    }
    async createInsuranceBrackets(id) {
        const ib = new this.insuranceBracketsModel(id);
        return ib.save();
    }
    async editInsuranceBrackets(id, updateData) {
        return await this.insuranceBracketsModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async removeInsuranceBrackets(id) {
        return await this.insuranceBracketsModel.findByIdAndDelete(id);
    }
    calculateInsurance(employeeRate, minSalary, maxSalary) {
        const salaryRange = maxSalary - minSalary;
        const socialInsurance = employeeRate * salaryRange;
        return socialInsurance;
    }
    async payrollManagerApprove(model, id) {
        const modelsMap = {
            payrollPolicies: this.payrollPoliciesModel,
            payGrade: this.payGradeModel,
            payType: this.payTypeModel,
            allowance: this.allowanceModel,
            signingBonus: this.signingBonusModel,
            terminationBenefits: this.terminationAndResignationBenefitsModel,
        };
        const targetModel = modelsMap[model];
        if (!targetModel)
            throw new Error(`Model ${model} not found`);
        return targetModel.findByIdAndUpdate(id, { approvalStatus: 'approved' }, { new: true });
    }
    async payrollManagerReject(model, id) {
        const modelsMap = {
            payrollPolicies: this.payrollPoliciesModel,
            payGrade: this.payGradeModel,
            payType: this.payTypeModel,
            allowance: this.allowanceModel,
            signingBonus: this.signingBonusModel,
            terminationBenefits: this.terminationAndResignationBenefitsModel,
        };
        const targetModel = modelsMap[model];
        if (!targetModel)
            throw new Error(`Model ${model} not found`);
        return targetModel.findByIdAndUpdate(id, { approvalStatus: 'rejected' }, { new: true });
    }
    async hrApproveInsurance(id) {
        return this.insuranceBracketsModel.findByIdAndUpdate(id, { approvalStatus: 'approved' }, { new: true });
    }
    async hrRejectInsurance(id) {
        return this.insuranceBracketsModel.findByIdAndUpdate(id, { approvalStatus: 'rejected' }, { new: true });
    }
    async create(dto) {
        const newSettings = new this.companyWideSettingsModel(dto);
        return newSettings.save();
    }
    async findAll() {
        return this.companyWideSettingsModel.find().exec();
    }
    async findOne(id) {
        return this.companyWideSettingsModel.findById(id).exec();
    }
    async update(id, dto) {
        return this.companyWideSettingsModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async delete(id) {
        return this.companyWideSettingsModel.findByIdAndDelete(id);
    }
    async approveOrReject(dto) {
        const { model, id, action } = dto;
        const modelsMap = {
            payrollPolicies: this.payrollPoliciesModel,
            payGrade: this.payGradeModel,
            payType: this.payTypeModel,
            allowance: this.allowanceModel,
            signingBonus: this.signingBonusModel,
            terminationBenefits: this.terminationAndResignationBenefitsModel,
            insurance: this.insuranceBracketsModel,
            companySettings: this.companyWideSettingsModel,
        };
        const targetModel = modelsMap[model];
        if (!targetModel)
            throw new Error(`Model ${model} not found`);
        const status = action === 'approve' ? 'approved' : 'rejected';
        return targetModel.findByIdAndUpdate(id, { approvalStatus: status }, { new: true });
    }
    async findAllTaxRules() {
        return this.taxRulesModel.find().exec();
    }
    async findTaxRuleById(id) {
        return this.taxRulesModel.findById(id).exec();
    }
    async createTaxRule(taxRuleData) {
        const newTaxRule = new this.taxRulesModel(taxRuleData);
        return newTaxRule.save();
    }
    async updateTaxRule(id, updateData) {
        return this.taxRulesModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async deleteTaxRule(id) {
        return this.taxRulesModel.findByIdAndDelete(id).exec();
    }
    async getAllTerminationAndResignationBenefits() {
        return this.terminationAndResignationBenefitsModel.find().exec();
    }
    async getTerminationAndResignationBenefitById(id) {
        return this.terminationAndResignationBenefitsModel.findById(id).exec();
    }
    async createTerminationAndResignationBenefit(data) {
        const newBenefit = new this.terminationAndResignationBenefitsModel(data);
        return newBenefit.save();
    }
    async updateTerminationAndResignationBenefit(id, updateData) {
        return this.terminationAndResignationBenefitsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async deleteTerminationAndResignationBenefit(id) {
        return this.terminationAndResignationBenefitsModel.findByIdAndDelete(id).exec();
    }
    async backupPayrollData() {
        const [policies, payGrades, payTypes, allowances, signingBonuses, terminationBenefits, insuranceBrackets, taxRules, companySettings,] = await Promise.all([
            this.payrollPoliciesModel.find().lean().exec(),
            this.payGradeModel.find().lean().exec(),
            this.payTypeModel.find().lean().exec(),
            this.allowanceModel.find().lean().exec(),
            this.signingBonusModel.find().lean().exec(),
            this.terminationAndResignationBenefitsModel.find().lean().exec(),
            this.insuranceBracketsModel.find().lean().exec(),
            this.taxRulesModel.find().lean().exec(),
            this.companyWideSettingsModel.find().lean().exec(),
        ]);
        return {
            policies,
            payGrades,
            payTypes,
            allowances,
            signingBonuses,
            terminationBenefits,
            insuranceBrackets,
            taxRules,
            companySettings,
            timestamp: new Date(),
        };
    }
};
exports.PayrollConfigurationService = PayrollConfigurationService;
exports.PayrollConfigurationService = PayrollConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payrollPolicies_schema_1.payrollPolicies.name)),
    __param(1, (0, mongoose_1.InjectModel)(payGrades_schema_1.payGrade.name)),
    __param(2, (0, mongoose_1.InjectModel)(allowance_schema_1.allowance.name)),
    __param(3, (0, mongoose_1.InjectModel)(CompanyWideSettings_schema_1.CompanyWideSettings.name)),
    __param(4, (0, mongoose_1.InjectModel)(insuranceBrackets_schema_1.insuranceBrackets.name)),
    __param(5, (0, mongoose_1.InjectModel)(payType_schema_1.payType.name)),
    __param(6, (0, mongoose_1.InjectModel)(signingBonus_schema_1.signingBonus.name)),
    __param(7, (0, mongoose_1.InjectModel)(taxRules_schema_1.taxRules.name)),
    __param(8, (0, mongoose_1.InjectModel)(terminationAndResignationBenefits_1.terminationAndResignationBenefits.name)),
    __metadata("design:paramtypes", [Mongoose.Model, Mongoose.Model, Mongoose.Model, Mongoose.Model, Mongoose.Model, Mongoose.Model, Mongoose.Model, Mongoose.Model, Mongoose.Model])
], PayrollConfigurationService);
//# sourceMappingURL=payroll-configuration.service.js.map