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
exports.OffboardingController = void 0;
const common_1 = require("@nestjs/common");
const offboarding_service_1 = require("../services/offboarding.service");
const create_termination_request_dto_1 = require("../dto/create-termination-request.dto");
const update_termination_request_dto_1 = require("../dto/update-termination-request.dto");
const create_clearance_checklist_dto_1 = require("../dto/create-clearance-checklist.dto");
const update_clearance_checklist_dto_1 = require("../dto/update-clearance-checklist.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../../employee-profile/enums/employee-profile.enums");
let OffboardingController = class OffboardingController {
    offboardingService;
    constructor(offboardingService) {
        this.offboardingService = offboardingService;
    }
    async createTerminationRequest(createDto) {
        return this.offboardingService.createTerminationRequest(createDto);
    }
    async getAllTerminationRequests(employeeId) {
        return this.offboardingService.getAllTerminationRequests(employeeId);
    }
    async getTerminationRequest(id) {
        return this.offboardingService.getTerminationRequest(id);
    }
    async updateTerminationRequest(id, updateDto) {
        return this.offboardingService.updateTerminationRequest(id, updateDto);
    }
    async createClearanceChecklist(createDto) {
        return this.offboardingService.createClearanceChecklist(createDto);
    }
    async getAllClearanceChecklists(terminationId) {
        return this.offboardingService.getAllClearanceChecklists(terminationId);
    }
    async getClearanceChecklist(id) {
        return this.offboardingService.getClearanceChecklist(id);
    }
    async updateClearanceChecklist(id, updateDto) {
        return this.offboardingService.updateClearanceChecklist(id, updateDto);
    }
    async deleteClearanceChecklist(id) {
        return this.offboardingService.deleteClearanceChecklist(id);
    }
};
exports.OffboardingController = OffboardingController;
__decorate([
    (0, common_1.Post)('requests'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_termination_request_dto_1.CreateTerminationRequestDto]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "createTerminationRequest", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "getAllTerminationRequests", null);
__decorate([
    (0, common_1.Get)('requests/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "getTerminationRequest", null);
__decorate([
    (0, common_1.Patch)('requests/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_termination_request_dto_1.UpdateTerminationRequestDto]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "updateTerminationRequest", null);
__decorate([
    (0, common_1.Post)('checklists'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clearance_checklist_dto_1.CreateClearanceChecklistDto]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "createClearanceChecklist", null);
__decorate([
    (0, common_1.Get)('checklists'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.FINANCE_STAFF, employee_profile_enums_1.SystemRole.DEPARTMENT_MANAGER, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    __param(0, (0, common_1.Query)('terminationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "getAllClearanceChecklists", null);
__decorate([
    (0, common_1.Get)('checklists/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.FINANCE_STAFF, employee_profile_enums_1.SystemRole.DEPARTMENT_MANAGER, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "getClearanceChecklist", null);
__decorate([
    (0, common_1.Patch)('checklists/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.SystemRole.FINANCE_STAFF, employee_profile_enums_1.SystemRole.DEPARTMENT_MANAGER, employee_profile_enums_1.SystemRole.DEPARTMENT_HEAD),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clearance_checklist_dto_1.UpdateClearanceChecklistDto]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "updateClearanceChecklist", null);
__decorate([
    (0, common_1.Delete)('checklists/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffboardingController.prototype, "deleteClearanceChecklist", null);
exports.OffboardingController = OffboardingController = __decorate([
    (0, common_1.Controller)('offboarding'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [offboarding_service_1.OffboardingService])
], OffboardingController);
//# sourceMappingURL=offboarding.controller.js.map