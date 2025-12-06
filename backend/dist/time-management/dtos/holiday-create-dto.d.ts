import { HolidayType } from "../models/enums/index";
export declare class CreateHolidayDto {
    type: HolidayType;
    startDate: string;
    endDate?: string;
    name?: string;
    active?: boolean;
}
