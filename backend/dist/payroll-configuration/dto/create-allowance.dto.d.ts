import { ConfigStatus } from '../enums/payroll-configuration-enums';
export declare class createAllowanceDto {
    name: string;
    amount: number;
    status?: ConfigStatus;
}
