import { OfferResponseStatus } from '../enums/offer-response-status.enum';
import { OfferFinalStatus } from '../enums/offer-final-status.enum';
export declare class CreateJobOfferDto {
    applicationId: string;
    candidateId: string;
    hrEmployeeId?: string;
    grossSalary: number;
    signingBonus: number;
    benefits: string;
    conditions: string;
    insurances: string;
    content: string;
    role: string;
    deadline: Date;
    applicantResponse?: OfferResponseStatus;
    finalStatus?: OfferFinalStatus;
}
