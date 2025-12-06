import { DocumentType } from '../enums/document-type.enum';
import { OnboardingTaskStatus } from '../enums/onboarding-task-status.enum';
export declare class OnboardingTaskDto {
    name: string;
    department?: string;
    status?: OnboardingTaskStatus;
    deadline?: Date;
    completedAt?: Date;
    documentId?: string;
    notes?: string;
}
export declare class CreateOnboardingDocumentDto {
    candidateId?: string;
    employeeId?: string;
    tasks?: OnboardingTaskDto[];
    type: DocumentType;
    documentName: string;
    filePath: string;
}
