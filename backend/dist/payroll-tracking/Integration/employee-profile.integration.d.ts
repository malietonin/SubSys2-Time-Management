export interface EmployeeSummary {
    id: string;
    fullName: string;
    email: string;
    employeeCode?: string;
    departmentId?: string;
    positionId?: string;
}
export declare class EmployeeProfileIntegrationService {
    getEmployeeById(employeeId: string): Promise<EmployeeSummary>;
}
