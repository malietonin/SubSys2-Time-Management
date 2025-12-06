import { TerminationInitiation } from '../enums/termination-initiation.enum';
import { TerminationStatus } from '../enums/termination-status.enum';
export declare class CreateTerminationRequestDto {
    employeeId: string;
    initiator: TerminationInitiation;
    reason: string;
    employeeComments?: string;
    hrComments?: string;
    status?: TerminationStatus;
    terminationDate?: string;
    contractId: string;
}
