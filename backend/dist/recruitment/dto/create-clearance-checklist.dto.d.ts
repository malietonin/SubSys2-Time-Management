import { ApprovalStatus } from '../enums/approval-status.enum';
declare class ChecklistItemDto {
    department: string;
    status?: ApprovalStatus;
    comments?: string;
    updatedBy?: string;
    updatedAt?: string;
}
declare class EquipmentItemDto {
    equipmentId?: string;
    name: string;
    returned?: boolean;
    condition?: string;
}
export declare class CreateClearanceChecklistDto {
    terminationId: string;
    items?: ChecklistItemDto[];
    equipmentList?: EquipmentItemDto[];
    cardReturned?: boolean;
}
export {};
