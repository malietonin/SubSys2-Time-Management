import { PayrollConfigurationService } from './payroll-configuration.service';
import { updatePayrollPoliciesDto } from './dto/update-policies.dto';
import { createPayrollPoliciesDto } from './dto/create-policies.dto';
import { createResigAndTerminBenefitsDTO } from './dto/create-resigAndTerm.dto';
import { createInsuranceBracketsDTO } from './dto/create-insurance.dto';
import { editInsuranceBracketsDTO } from './dto/edit-insurance.dto';
import { payrollPoliciesDocument } from './models/payrollPolicies.schema';
import { CreateCompanySettingsDto } from './dto/create-company-settings.dto';
import { UpdateCompanySettingsDto } from './dto/UpdateCompanySettings.dto';
import { ApprovalDto } from './dto/approval.dto';
import { createTaxRulesDTO } from './dto/create-tax-rules.dto';
import { editTaxRulesDTO } from './dto/edit-tax-rules.dto';
export declare class PayrollConfigurationController {
    private readonly payrollConfigurationService;
    constructor(payrollConfigurationService: PayrollConfigurationService);
    getAllPolicies(): Promise<payrollPoliciesDocument[]>;
    getPolicyById(id: string): Promise<payrollPoliciesDocument | null>;
    createPolicy(policyData: createPayrollPoliciesDto): Promise<payrollPoliciesDocument>;
    updatePolicy(id: string, updateData: updatePayrollPoliciesDto): Promise<payrollPoliciesDocument | null>;
    deletePolicy(id: string): Promise<payrollPoliciesDocument | null>;
    findInsuranceBracket(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createInsuranceBracket(bracketData: createInsuranceBracketsDTO): Promise<(import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    editInsuranceBracket(id: string, updateData: editInsuranceBracketsDTO): Promise<(import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    removeInsuranceBracket(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    approvePayrollConfig(model: string, id: string): Promise<any>;
    rejectPayrollConfig(model: string, id: string): Promise<any>;
    approveInsurance(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    rejectInsurance(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/insuranceBrackets.schema").insuranceBrackets, {}, {}> & import("./models/insuranceBrackets.schema").insuranceBrackets & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createSettings(dto: CreateCompanySettingsDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllSettings(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getSettings(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateSettings(id: string, dto: UpdateCompanySettingsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    deleteSettings(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("./models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    approveOrReject(dto: ApprovalDto): Promise<any>;
    getAllTaxRules(): Promise<(import("mongoose").Document<unknown, {}, import("./models/taxRules.schema").taxRules, {}, {}> & import("./models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTaxRuleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/taxRules.schema").taxRules, {}, {}> & import("./models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createTaxRule(taxRuleData: createTaxRulesDTO): Promise<import("mongoose").Document<unknown, {}, import("./models/taxRules.schema").taxRules, {}, {}> & import("./models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateTaxRule(id: string, updateData: editTaxRulesDTO): Promise<(import("mongoose").Document<unknown, {}, import("./models/taxRules.schema").taxRules, {}, {}> & import("./models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteTaxRule(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/taxRules.schema").taxRules, {}, {}> & import("./models/taxRules.schema").taxRules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getAllTerminationAndResignationBenefits(): Promise<(import("mongoose").Document<unknown, {}, import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTerminationAndResignationBenefitById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createTerminationAndResignationBenefit(benefitsData: createResigAndTerminBenefitsDTO): Promise<import("mongoose").Document<unknown, {}, import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateTerminationAndResignationBenefit(id: string, updateData: createResigAndTerminBenefitsDTO): Promise<(import("mongoose").Document<unknown, {}, import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteTerminationAndResignationBenefit(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits, {}, {}> & import("./models/terminationAndResignationBenefits").terminationAndResignationBenefits & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
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
