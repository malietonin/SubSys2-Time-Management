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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const onboarding_service_1 = require("../services/onboarding.service");
const create_onboarding_task_dto_1 = require("../dto/create-onboarding-task.dto");
const update_onboarding_task_dto_1 = require("../dto/update-onboarding-task.dto");
const create_onboarding_contract_dto_1 = require("../dto/create-onboarding-contract.dto");
const update_onboarding_contract_dto_1 = require("../dto/update-onboarding-contract.dto");
const create_onboarding_document_dto_1 = require("../dto/create-onboarding-document.dto");
const update_onboarding_document_dto_1 = require("../dto/update-onboarding-document.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../../employee-profile/enums/employee-profile.enums");
let OnboardingController = class OnboardingController {
    onboardingService;
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    async getAllContracts() {
        return this.onboardingService.getAllContracts();
    }
    async getContract(id) {
        return this.onboardingService.getContractById(id);
    }
    async createContract(dto) {
        return this.onboardingService.createContract(dto);
    }
    async updateContract(id, dto) {
        return this.onboardingService.updateContract(id, dto);
    }
    async getAllDocuments() {
        return this.onboardingService.getAllOnboardingDocuments();
    }
    async getDocument(id) {
        return this.onboardingService.getOnboardingDocument(id);
    }
    async getDocumentsByCandidate(candidateId) {
        return this.onboardingService.getDocumentsByCandidate(candidateId);
    }
    async getDocumentsByEmployee(employeeId) {
        return this.onboardingService.getDocumentsByEmployee(employeeId);
    }
    async createDocument(dto) {
        return this.onboardingService.createOnboardingDocument(dto);
    }
    async updateDocument(id, dto) {
        return this.onboardingService.updateOnboardingDocument(id, dto);
    }
    async deleteDocument(id) {
        return this.onboardingService.deleteOnboardingDocument(id);
    }
    async getAllTasks() {
        return this.onboardingService.getAllTasks();
    }
    async getTask(id) {
        return this.onboardingService.getTaskById(id);
    }
    async createTask(dto) {
        return this.onboardingService.createOnboardingTask(dto);
    }
    async updateTask(id, dto) {
        return this.onboardingService.updateOnboardingTask(id, dto);
    }
    async deleteTask(id, taskIndex) {
        return this.onboardingService.deleteTask(id, +taskIndex);
    }
    async deleteOnboardingRecord(id) {
        return this.onboardingService.deleteOnboardingRecord(id);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Get)('contracts'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getAllContracts", null);
__decorate([
    (0, common_1.Get)('contracts/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getContract", null);
__decorate([
    (0, common_1.Post)('contracts'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_onboarding_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createContract", null);
__decorate([
    (0, common_1.Patch)('contracts/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_onboarding_contract_dto_1.UpdateContractDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "updateContract", null);
__decorate([
    (0, common_1.Get)('documents'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getAllDocuments", null);
__decorate([
    (0, common_1.Get)('documents/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Get)('documents/candidate/:candidateId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('candidateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getDocumentsByCandidate", null);
__decorate([
    (0, common_1.Get)('documents/employee/:employeeId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getDocumentsByEmployee", null);
__decorate([
    (0, common_1.Post)('documents'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_onboarding_document_dto_1.CreateOnboardingDocumentDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Patch)('documents/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_onboarding_document_dto_1.UpdateOnboardingDocumentDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Delete)('documents/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Get)('tasks'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)('tasks/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getTask", null);
__decorate([
    (0, common_1.Post)('tasks'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_onboarding_task_dto_1.CreateOnboardingTaskDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createTask", null);
__decorate([
    (0, common_1.Patch)('tasks/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_onboarding_task_dto_1.UpdateOnboardingTaskDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)('tasks/:id/:taskIndex'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('taskIndex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Delete)('tasks/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "deleteOnboardingRecord", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, common_1.Controller)('onboarding'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map