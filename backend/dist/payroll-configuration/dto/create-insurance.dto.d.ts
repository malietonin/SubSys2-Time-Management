import { ConfigStatus } from '../enums/payroll-configuration-enums';
export declare class createInsuranceBracketsDTO {
    name: string;
    amount: number;
    status: ConfigStatus;
    minSalary: number;
    maxSalary: number;
    EmployeeRate: number;
    EmployerRate: number;
}
