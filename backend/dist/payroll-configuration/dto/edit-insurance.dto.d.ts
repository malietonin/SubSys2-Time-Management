import { ConfigStatus } from '../enums/payroll-configuration-enums';
export declare class editInsuranceBracketsDTO {
    name?: string;
    amount?: number;
    status?: ConfigStatus;
    minSalary?: number;
    maxSalary?: number;
    EmployeeRate?: number;
    EmployerRate?: number;
}
