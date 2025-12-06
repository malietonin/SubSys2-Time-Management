import { OffboardingService } from '../services/offboarding.service';
import { CreateTerminationRequestDto } from '../dto/create-termination-request.dto';
import { UpdateTerminationRequestDto } from '../dto/update-termination-request.dto';
import { CreateClearanceChecklistDto } from '../dto/create-clearance-checklist.dto';
import { UpdateClearanceChecklistDto } from '../dto/update-clearance-checklist.dto';
export declare class OffboardingController {
    private readonly offboardingService;
    constructor(offboardingService: OffboardingService);
    createTerminationRequest(createDto: CreateTerminationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("../models/termination-request.schema").TerminationRequest, {}, {}> & import("../models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllTerminationRequests(employeeId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/termination-request.schema").TerminationRequest, {}, {}> & import("../models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTerminationRequest(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/termination-request.schema").TerminationRequest, {}, {}> & import("../models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateTerminationRequest(id: string, updateDto: UpdateTerminationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("../models/termination-request.schema").TerminationRequest, {}, {}> & import("../models/termination-request.schema").TerminationRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createClearanceChecklist(createDto: CreateClearanceChecklistDto): Promise<import("mongoose").Document<unknown, {}, import("../models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("../models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllClearanceChecklists(terminationId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("../models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getClearanceChecklist(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("../models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateClearanceChecklist(id: string, updateDto: UpdateClearanceChecklistDto): Promise<import("mongoose").Document<unknown, {}, import("../models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("../models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteClearanceChecklist(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/clearance-checklist.schema").ClearanceChecklist, {}, {}> & import("../models/clearance-checklist.schema").ClearanceChecklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
