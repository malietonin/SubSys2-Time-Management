import { ApplicationStage } from "../enums/application-stage.enum";
import { ApplicationStatus } from "../enums/application-status.enum";
export declare class CreateApplicationDto {
    candidateId: string;
    requisitionId: string;
    assignedHr?: string;
    currentStage?: ApplicationStage;
    status?: ApplicationStatus;
}
