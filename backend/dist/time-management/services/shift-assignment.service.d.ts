import { EmployeeProfileService } from './../../employee-profile/employee-profile.service';
import { ShiftAssignmentCreateDto } from './../dtos/shift-assignment-create-dto';
import { ShiftAssignmentDocument } from './../models/shift-assignment.schema';
import { ShiftAssignment } from "../models/shift-assignment.schema";
import { Model, Types } from 'mongoose';
import { ShiftDocument } from '../models/shift.schema';
import { OrganizationStructureService } from '../../organization-structure/organization-structure.service';
import { ShiftAssignmentStatus } from '../models/enums';
import { ShiftAssignmentUpdateDto } from '../dtos/shift-assignment-update-dto';
export declare class ShiftAssignmentService {
    private shiftAssignmentModel;
    private shiftModel;
    private employeeProfileService;
    private organizationStructureService;
    constructor(shiftAssignmentModel: Model<ShiftAssignmentDocument>, shiftModel: Model<ShiftDocument>, employeeProfileService: EmployeeProfileService, organizationStructureService: OrganizationStructureService);
    assignShift(assignData: ShiftAssignmentCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateShiftAssignment(newStatus: ShiftAssignmentStatus, shiftAssignmentId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getShiftAssignmentById(shiftAssignmentId: string): Promise<{
        sucess: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllShiftAssignments(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    extendShiftAssignment(dto: ShiftAssignmentUpdateDto, shiftAssignmentId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftAssignment, {}, {}> & ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    detectUpcomingExpiry(): Promise<{
        success: boolean;
        message: string;
        data: void[];
    }>;
}
