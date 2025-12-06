import { ConfigStatus } from '../enums/payroll-configuration-enums';
export declare class createResigAndTerminBenefitsDTO {
    name: string;
    amount: number;
    terms?: string;
    status: ConfigStatus;
}
