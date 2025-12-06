import { ConfigStatus } from '../enums/payroll-configuration-enums';
export declare class createTaxRulesDTO {
    name: string;
    description?: string;
    rate: number;
    status: ConfigStatus;
}
