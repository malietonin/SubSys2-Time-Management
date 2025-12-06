import { PolicyType } from '../enums/payroll-configuration-enums';
import { Applicability } from '../enums/payroll-configuration-enums';
import { ConfigStatus } from '../enums/payroll-configuration-enums';
export declare class createPayrollPoliciesDto {
    policyName: string;
    policyType: PolicyType;
    description: string;
    effectiveDate: Date;
    ruleDefinition: {
        percentage: number;
        fixedAmount: number;
        thresholdAmount: number;
    };
    applicability: Applicability;
    ConfigStatus: ConfigStatus;
}
