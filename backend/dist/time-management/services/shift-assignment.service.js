"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftAssignmentService = void 0;
const employee_profile_service_1 = require("./../../employee-profile/employee-profile.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shift_assignment_schema_1 = require("../models/shift-assignment.schema");
const mongoose_2 = require("mongoose");
const shift_schema_1 = require("../models/shift.schema");
const organization_structure_service_1 = require("../../organization-structure/organization-structure.service");
const enums_1 = require("../models/enums");
let ShiftAssignmentService = class ShiftAssignmentService {
    shiftAssignmentModel;
    shiftModel;
    employeeProfileService;
    organizationStructureService;
    constructor(shiftAssignmentModel, shiftModel, employeeProfileService, organizationStructureService) {
        this.shiftAssignmentModel = shiftAssignmentModel;
        this.shiftModel = shiftModel;
        this.employeeProfileService = employeeProfileService;
        this.organizationStructureService = organizationStructureService;
    }
    async assignShift(assignData) {
        if (!assignData.employeeId && !assignData.departmentId && !assignData.positionId) {
            throw new common_1.BadRequestException("Either Employee ID, Department ID or Position ID must be provided!");
        }
        const dataLength = [
            assignData.employeeId, assignData.departmentId, assignData.positionId
        ].filter(Boolean).length;
        if (dataLength > 1) {
            throw new common_1.BadRequestException("Only provide either Employee ID, Department ID or Position ID");
        }
        if (!assignData.shiftId) {
            throw new common_1.BadRequestException("Shift ID must be provided!");
        }
        if (assignData.employeeId) {
            const employee = await this.employeeProfileService.getMyProfile(assignData.employeeId.toString());
            if (!employee)
                throw new common_1.NotFoundException("Employee not found!");
        }
        if (assignData.departmentId) {
            const department = await this.organizationStructureService.getDepartmentById(assignData.departmentId.toString());
            if (!department)
                throw new common_1.NotFoundException("Department not found!");
        }
        if (assignData.positionId) {
            const position = await this.organizationStructureService.getPositionById(assignData.positionId.toString());
            if (!position)
                throw new common_1.NotFoundException("Position not found!");
        }
        const shift = await this.shiftModel.findById(assignData.shiftId);
        if (!shift)
            throw new common_1.NotFoundException("Shift not found!");
        const shiftAssignment = await this.shiftAssignmentModel.create({
            employeeId: assignData.employeeId,
            departmentId: assignData.departmentId,
            positionId: assignData.positionId,
            shiftId: assignData.shiftId
        });
        return {
            success: true,
            message: "Shift Assigned Successfully!",
            data: shiftAssignment
        };
    }
    async updateShiftAssignment(newStatus, shiftAssignmentId) {
        if (!Object.values(enums_1.ShiftAssignmentStatus).includes(newStatus)) {
            throw new common_1.BadRequestException(`Status: ${newStatus} is invalid!`);
        }
        const shiftAssignment = await this.shiftAssignmentModel.findByIdAndUpdate(shiftAssignmentId, {
            status: newStatus
        }, { new: true });
        if (!shiftAssignment) {
            throw new common_1.NotFoundException('Shift Assignment not found!');
        }
        return {
            success: true,
            message: "Shift Assignment Status Updated Successfully!",
            data: shiftAssignment
        };
    }
    async getShiftAssignmentById(shiftAssignmentId) {
        const shiftAssignment = await this.shiftAssignmentModel.findById(shiftAssignmentId);
        if (!shiftAssignment)
            throw new common_1.NotFoundException('Shift Assignment not found!');
        return {
            sucess: true,
            message: "Shift assignment found successfully!",
            data: shiftAssignment
        };
    }
    async getAllShiftAssignments() {
        const shiftAssignments = await this.shiftAssignmentModel.find()
            .populate('employeeId')
            .populate('shiftId')
            .populate('positionId')
            .populate('departmentId')
            .exec();
        if (!shiftAssignments)
            throw new common_1.NotFoundException('Shift Assignments not found!');
        return {
            success: true,
            message: "Shift Assignments found successfully!",
            data: shiftAssignments
        };
    }
    async extendShiftAssignment(dto, shiftAssignmentId) {
        const newEndDate = new Date(dto.endDate);
        if (isNaN(newEndDate.getTime()))
            throw new common_1.BadRequestException("Invalid date format. Use ISO format like YYYY-MM-DD.");
        if (newEndDate <= new Date()) {
            throw new common_1.BadRequestException('The extension date must be in the future.');
        }
        const shiftAssignment = await this.shiftAssignmentModel.findById(shiftAssignmentId);
        if (!shiftAssignment)
            throw new common_1.NotFoundException('Shift Assignment not found!');
        shiftAssignment.endDate = newEndDate;
        await shiftAssignment.save();
        return {
            success: true,
            message: "Shift assignment expiry date extended!",
            data: shiftAssignment
        };
    }
    async detectUpcomingExpiry() {
        const shiftAssignments = await this.shiftAssignmentModel.find();
        const near_days = 3;
        const now = Date.now();
        if (!shiftAssignments)
            throw new common_1.NotFoundException('Shift assignments not found!');
        const processed = shiftAssignments.map(s => {
            const diffDays = (s.endDate.getTime() - now) / (1000 * 60 * 60 * 24);
        });
        return {
            success: true,
            message: "Shift Assignments nearing expiry returned!",
            data: processed
        };
    }
};
exports.ShiftAssignmentService = ShiftAssignmentService;
exports.ShiftAssignmentService = ShiftAssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shift_assignment_schema_1.ShiftAssignment.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        employee_profile_service_1.EmployeeProfileService,
        organization_structure_service_1.OrganizationStructureService])
], ShiftAssignmentService);
//# sourceMappingURL=shift-assignment.service.js.map