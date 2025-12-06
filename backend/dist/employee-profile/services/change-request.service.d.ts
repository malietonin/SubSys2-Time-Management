import { Model } from 'mongoose';
import { EmployeeProfileDocument } from '../models/employee-profile.schema';
import { EmployeeProfileChangeRequest } from '../models/ep-change-request.schema';
import { CreateChangeRequestDto } from '../dto/create-change-request.dto';
import { ProcessChangeRequestDto } from '../dto/process-change-request.dto';
import { NotificationLogService } from '../../time-management/services/notification-log.service';
import { OrganizationStructureService } from '../../organization-structure/organization-structure.service';
export declare class ChangeRequestService {
    private employeeProfileModel;
    private changeRequestModel;
    private notificationLogService;
    private organizationStructureService;
    constructor(employeeProfileModel: Model<EmployeeProfileDocument>, changeRequestModel: Model<EmployeeProfileChangeRequest>, notificationLogService: NotificationLogService, organizationStructureService: OrganizationStructureService);
    createChangeRequest(employeeId: string, _userId: string, createDto: CreateChangeRequestDto): Promise<EmployeeProfileChangeRequest>;
    getMyChangeRequests(employeeId: string): Promise<EmployeeProfileChangeRequest[]>;
    getPendingChangeRequests(): Promise<EmployeeProfileChangeRequest[]>;
    getChangeRequestById(requestId: string): Promise<EmployeeProfileChangeRequest>;
    processChangeRequest(requestId: string, userId: string, userRole: string, processDto: ProcessChangeRequestDto): Promise<EmployeeProfileChangeRequest>;
}
