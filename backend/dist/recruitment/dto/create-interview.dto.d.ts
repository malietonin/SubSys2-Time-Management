import { InterviewMethod } from "../enums/interview-method.enum";
import { InterviewStatus } from "../enums/interview-status.enum";
import { ApplicationStage } from "../enums/application-stage.enum";
export declare class CreateInterviewDto {
    applicationId: string;
    stage: ApplicationStage;
    scheduledDate: Date;
    method: InterviewMethod;
    panel: string[];
    calendarEventId?: string;
    videoLink?: string;
    status?: InterviewStatus;
    feedbackId?: string;
    candidateFeedback?: string;
}
