import { OnboardingTaskStatus } from '../enums/onboarding-task-status.enum';
declare class TaskItemDto {
    name: string;
    department?: string;
    status?: OnboardingTaskStatus;
    deadline?: Date;
    completedAt?: Date;
    documentId?: string;
    notes?: string;
}
export declare class CreateOnboardingTaskDto {
    employeeId: string;
    tasks?: TaskItemDto[];
    completed?: boolean;
    completedAt?: Date;
}
export {};
