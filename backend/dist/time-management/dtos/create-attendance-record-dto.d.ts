import { PunchType } from "../models/enums/index";
export declare class CreateAttendancePunchDto {
    employeeId: string;
    punchType: PunchType;
    startDate?: string;
    endDate?: string;
}
