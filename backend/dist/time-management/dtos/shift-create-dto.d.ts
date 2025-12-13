import { PunchPolicy } from "../models/enums";
import { Types } from "mongoose";
export declare class ShiftCreateDto {
    name: string;
    shiftType: Types.ObjectId;
    startTime: string;
    endTime: string;
    punchPolicy: PunchPolicy;
    graceInMinutes: number;
    graceOutMinutes: number;
    requiresApprovalForOvertime: boolean;
    active: boolean;
}
