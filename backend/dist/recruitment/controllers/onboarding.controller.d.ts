import { OnboardingService } from '../services/onboarding.service';
import { CreateOnboardingTaskDto } from '../dto/create-onboarding-task.dto';
import { UpdateOnboardingTaskDto } from '../dto/update-onboarding-task.dto';
import { CreateContractDto } from '../dto/create-onboarding-contract.dto';
import { UpdateContractDto } from '../dto/update-onboarding-contract.dto';
import { CreateOnboardingDocumentDto } from '../dto/create-onboarding-document.dto';
import { UpdateOnboardingDocumentDto } from '../dto/update-onboarding-document.dto';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    getAllContracts(): Promise<(import("mongoose").Document<unknown, {}, import("../models/contract.schema").Contract, {}, {}> & import("../models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getContract(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/contract.schema").Contract, {}, {}> & import("../models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createContract(dto: CreateContractDto): Promise<import("mongoose").Document<unknown, {}, import("../models/contract.schema").Contract, {}, {}> & import("../models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateContract(id: string, dto: UpdateContractDto): Promise<import("mongoose").Document<unknown, {}, import("../models/contract.schema").Contract, {}, {}> & import("../models/contract.schema").Contract & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllDocuments(): Promise<(import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getDocument(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getDocumentsByCandidate(candidateId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getDocumentsByEmployee(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createDocument(dto: CreateOnboardingDocumentDto): Promise<import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateDocument(id: string, dto: UpdateOnboardingDocumentDto): Promise<import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteDocument(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/document.schema").Document, {}, {}> & import("../models/document.schema").Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllTasks(): Promise<(import("mongoose").Document<unknown, {}, import("../models/onboarding.schema").Onboarding, {}, {}> & import("../models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTask(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/onboarding.schema").Onboarding, {}, {}> & import("../models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createTask(dto: CreateOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("../models/onboarding.schema").Onboarding, {}, {}> & import("../models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateTask(id: string, dto: UpdateOnboardingTaskDto): Promise<import("mongoose").Document<unknown, {}, import("../models/onboarding.schema").Onboarding, {}, {}> & import("../models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteTask(id: string, taskIndex: string): Promise<import("mongoose").Document<unknown, {}, import("../models/onboarding.schema").Onboarding, {}, {}> & import("../models/onboarding.schema").Onboarding & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteOnboardingRecord(id: string): Promise<void>;
}
