import * as Mongoose from 'mongoose';
import { allowanceDocument } from './models/allowance.schema';
import { CompanyWideSettings, CompanyWideSettingsDocument } from './models/CompanyWideSettings.schema';
import { insuranceBrackets, insuranceBracketsDocument } from './models/insuranceBrackets.schema';
import { payGradeDocument } from './models/payGrades.schema';
import { payrollPoliciesDocument } from './models/payrollPolicies.schema';
import { payTypeDocument } from './models/payType.schema';
import { signingBonusDocument } from './models/signingBonus.schema';
import { taxRulesDocument } from './models/taxRules.schema';
import { terminationAndResignationBenefitsDocument } from './models/terminationAndResignationBenefits';
import { updatePayrollPoliciesDto } from './dto/update-policies.dto';
import { createPayrollPoliciesDto } from './dto/create-policies.dto';
import { createAllowanceDto } from './dto/create-allowance.dto';
import { createResigAndTerminBenefitsDTO } from './dto/create-resigAndTerm.dto';
import { addPayGradeDTO } from './dto/create-paygrade.dto';
import { editPayGradeDTO } from './dto/edit-paygrade.dto';
import { editPayTypeDTO } from './dto/edit-paytype.dto';
import { createPayTypeDTO } from './dto/create-paytype.dto';
import { editsigningBonusDTO } from './dto/edit-signingBonus.dto';
import { createsigningBonusesDTO } from './dto/create-signingBonus.dto';
import { createInsuranceBracketsDTO } from './dto/create-insurance.dto';
import { editInsuranceBracketsDTO } from './dto/edit-insurance.dto';
import { CreateCompanySettingsDto } from './dto/create-company-settings.dto';
import { UpdateCompanySettingsDto } from './dto/UpdateCompanySettings.dto';
import { ApprovalDto } from './dto/approval.dto';
import { createTaxRulesDTO } from './dto/create-tax-rules.dto';
import { editTaxRulesDTO } from './dto/edit-tax-rules.dto';
export declare class PayrollConfigurationService {
    private payrollPoliciesModel;
    private payGradeModel;
    private allowanceModel;
    private companyWideSettingsModel;
    private insuranceBracketsModel;
    private payTypeModel;
    private signingBonusModel;
    private taxRulesModel;
    private terminationAndResignationBenefitsModel;
    constructor(payrollPoliciesModel: Mongoose.Model<payrollPoliciesDocument>, payGradeModel: Mongoose.Model<payGradeDocument>, allowanceModel: Mongoose.Model<allowanceDocument>, companyWideSettingsModel: Mongoose.Model<CompanyWideSettingsDocument>, insuranceBracketsModel: Mongoose.Model<insuranceBracketsDocument>, payTypeModel: Mongoose.Model<payTypeDocument>, signingBonusModel: Mongoose.Model<signingBonusDocument>, taxRulesModel: Mongoose.Model<taxRulesDocument>, terminationAndResignationBenefitsModel: Mongoose.Model<terminationAndResignationBenefitsDocument>);
    findAllPolicies(): Promise<payrollPoliciesDocument[]>;
    findById(id: string): Promise<payrollPoliciesDocument | null>;
    createPolicy(policyData: createPayrollPoliciesDto): Promise<payrollPoliciesDocument>;
    updatePolicy(id: string, updateData: updatePayrollPoliciesDto): Promise<payrollPoliciesDocument | null>;
    deletePolicy(id: string): Promise<payrollPoliciesDocument | null>;
    getPayGrade(id: string): Promise<payGradeDocument | null>;
    AddPayGrade(pg: addPayGradeDTO): Promise<payGradeDocument | null>;
    editPayGrade(pg: string, updateData: editPayGradeDTO): Promise<payGradeDocument | null>;
    remove(pg: string): Promise<payGradeDocument | null>;
    calculateGrossSalary(payGradeId: string, allowanceId: string): Promise<number>;
    getPayTypes(id: string): Promise<payTypeDocument | null>;
    getAllPayTypes(): Promise<payTypeDocument[]>;
    editPayTypes(pt: string, updateData: editPayTypeDTO): Promise<payTypeDocument | null>;
    createPayTypes(pt: createPayTypeDTO): Promise<payTypeDocument>;
    removePayType(pt: string): Promise<payTypeDocument | null>;
    createAllowance(id: createAllowanceDto): Promise<allowanceDocument>;
    getAllowance(id: string): Promise<allowanceDocument | null>;
    removeAllowance(id: string): Promise<allowanceDocument | null>;
    findSigningBonuses(id: string): Promise<signingBonusDocument | null>;
    editsigningBonus(id: string, updateData: editsigningBonusDTO): Promise<signingBonusDocument | null>;
    createSigningBonuses(id: createsigningBonusesDTO): Promise<signingBonusDocument | null>;
    removeSigningBonuses(id: string): Promise<signingBonusDocument | null>;
    createTerminationAndResignationBenefits(id: createResigAndTerminBenefitsDTO): Promise<terminationAndResignationBenefitsDocument>;
    removeTerminationAndResignationBenefits(id: string): Promise<terminationAndResignationBenefitsDocument | null>;
    findAllTerminationAndResignationBenefits(): Promise<terminationAndResignationBenefitsDocument[]>;
    findTerminationAndResignationBenefitsById(id: string): Promise<terminationAndResignationBenefitsDocument | null>;
    updateTerminationAndResignationBenefits(id: string, updateData: createResigAndTerminBenefitsDTO): Promise<terminationAndResignationBenefitsDocument | null>;
    findInsuranceBrackets(id: string): Promise<insuranceBracketsDocument | null>;
    createInsuranceBrackets(id: createInsuranceBracketsDTO): Promise<insuranceBracketsDocument | null>;
    editInsuranceBrackets(id: string, updateData: editInsuranceBracketsDTO): Promise<insuranceBracketsDocument | null>;
    removeInsuranceBrackets(id: string): Promise<insuranceBracketsDocument | null>;
    calculateInsurance(employeeRate: number, minSalary: number, maxSalary: number): number;
    payrollManagerApprove(model: string, id: string): Promise<any>;
    payrollManagerReject(model: string, id: string): Promise<any>;
    hrApproveInsurance(id: string): Promise<(Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, insuranceBrackets, {}, {}> & insuranceBrackets & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, insuranceBrackets, {}, {}> & insuranceBrackets & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>) | null>;
    hrRejectInsurance(id: string): Promise<(Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, insuranceBrackets, {}, {}> & insuranceBrackets & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, insuranceBrackets, {}, {}> & insuranceBrackets & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>) | null>;
    create(dto: CreateCompanySettingsDto): Promise<Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>>;
    findAll(): Promise<(Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<(Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>) | null>;
    update(id: string, dto: UpdateCompanySettingsDto): Promise<(Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>) | null>;
    delete(id: string): Promise<(Mongoose.Document<unknown, {}, Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Mongoose.Document<unknown, {}, CompanyWideSettings, {}, {}> & CompanyWideSettings & {
        _id: Mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Mongoose.Types.ObjectId;
    }>) | null>;
    approveOrReject(dto: ApprovalDto): Promise<any>;
    findAllTaxRules(): Promise<taxRulesDocument[]>;
    findTaxRuleById(id: string): Promise<taxRulesDocument | null>;
    createTaxRule(taxRuleData: createTaxRulesDTO): Promise<taxRulesDocument>;
    updateTaxRule(id: string, updateData: editTaxRulesDTO): Promise<taxRulesDocument | null>;
    deleteTaxRule(id: string): Promise<taxRulesDocument | null>;
    getAllTerminationAndResignationBenefits(): Promise<terminationAndResignationBenefitsDocument[]>;
    getTerminationAndResignationBenefitById(id: string): Promise<terminationAndResignationBenefitsDocument | null>;
    createTerminationAndResignationBenefit(data: createResigAndTerminBenefitsDTO): Promise<terminationAndResignationBenefitsDocument>;
    updateTerminationAndResignationBenefit(id: string, updateData: createResigAndTerminBenefitsDTO): Promise<terminationAndResignationBenefitsDocument | null>;
    deleteTerminationAndResignationBenefit(id: string): Promise<terminationAndResignationBenefitsDocument | null>;
    backupPayrollData(): Promise<{
        policies: any[];
        payGrades: any[];
        payTypes: any[];
        allowances: any[];
        signingBonuses: any[];
        terminationBenefits: any[];
        insuranceBrackets: any[];
        taxRules: any[];
        companySettings: any[];
        timestamp: Date;
    }>;
}
