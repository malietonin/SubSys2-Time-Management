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
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const recruitment_service_1 = require("../services/recruitment.service");
const create_job_offer_dto_1 = require("../dto/create-job-offer.dto");
const update_job_offer_dto_1 = require("../dto/update-job-offer.dto");
const create_referral_dto_1 = require("../dto/create-referral.dto");
const create_interview_dto_1 = require("../dto/create-interview.dto");
const update_interview_dto_1 = require("../dto/update-interview.dto");
const create_feedback_dto_1 = require("../dto/create-feedback.dto");
const update_feedback_dto_1 = require("../dto/update-feedback.dto");
const create_application_dto_1 = require("../dto/create-application.dto");
const create_job_template_dto_1 = require("../dto/create-job-template.dto");
const update_job_template_dtos_1 = require("../dto/update-job-template.dtos");
const create_job_requisition_dto_1 = require("../dto/create-job-requisition.dto");
const update_job_requisition_dto_1 = require("../dto/update-job-requisition.dto");
const update_application_dto_1 = require("../dto/update-application.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../../employee-profile/enums/employee-profile.enums");
let RecruitmentController = class RecruitmentController {
    recruitmentService;
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    createJobTemplate(createJobTemplateDto) {
        return this.recruitmentService.createJobTemplate(createJobTemplateDto);
    }
    getAllJobTemplates() {
        return this.recruitmentService.getAllJobTemplates();
    }
    getJobTemplate(id) {
        return this.recruitmentService.getJobTemplate(id);
    }
    updateJobTemplate(templateId, dto) {
        return this.recruitmentService.updateJobTemplate(templateId, dto);
    }
    deleteJobTemplate(id) {
        return this.recruitmentService.deleteJobTemplate(id);
    }
    createJobRequisition(templateId, createJobRequisitionDto) {
        return this.recruitmentService.createJobRequisition(createJobRequisitionDto, templateId);
    }
    getAllJobRequisitions() {
        return this.recruitmentService.getAllJobRequisitions();
    }
    getJobRequisition(id) {
        return this.recruitmentService.getJobRequisition(id);
    }
    updateJobRequisition(id, dto) {
        return this.recruitmentService.updateJobRequisition(id, dto);
    }
    deleteJobRequisition(id) {
        return this.recruitmentService.deleteJobRequisition(id);
    }
    createOffer(createJobOfferDto) {
        return this.recruitmentService.createOffer(createJobOfferDto);
    }
    getAllOffers() {
        return this.recruitmentService.getAllOffers();
    }
    getOffer(id) {
        return this.recruitmentService.getOffer(id);
    }
    updateOffer(id, updateJobOfferDto) {
        return this.recruitmentService.updateOffer(id, updateJobOfferDto);
    }
    createReferral(createReferralDto) {
        return this.recruitmentService.createReferral(createReferralDto);
    }
    getReferral(id) {
        return this.recruitmentService.getReferral(id);
    }
    createInterview(createInterviewDto) {
        return this.recruitmentService.createInterview(createInterviewDto);
    }
    getAllInterviews() {
        return this.recruitmentService.getAllInterviews();
    }
    getInterviewsByPanelMember(userId) {
        return this.recruitmentService.getInterviewsByPanelMember(userId);
    }
    getInterview(id) {
        return this.recruitmentService.getInterview(id);
    }
    updateInterview(id, updateInterviewDto) {
        return this.recruitmentService.updateInterview(id, updateInterviewDto);
    }
    createFeedback(createFeedbackDto) {
        return this.recruitmentService.createFeedback(createFeedbackDto);
    }
    getAllFeedback() {
        return this.recruitmentService.getAllFeedback();
    }
    getFeedback(id) {
        return this.recruitmentService.getFeedback(id);
    }
    updateFeedback(id, updateFeedbackDto) {
        return this.recruitmentService.updateFeedback(id, updateFeedbackDto);
    }
    getApplicationHistory(id) {
        return this.recruitmentService.getApplicationHistory(id);
    }
    createApplication(createApplicationDto) {
        return this.recruitmentService.createApplication(createApplicationDto);
    }
    getAllApplications() {
        return this.recruitmentService.getAllApplications();
    }
    getApplication(id) {
        return this.recruitmentService.getApplication(id);
    }
    updateApplication(id, updateApplicationDto) {
        return this.recruitmentService.updateApplication(id, updateApplicationDto);
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Post)('templates'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_template_dto_1.CreateJobTemplateDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createJobTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAllJobTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getJobTemplate", null);
__decorate([
    (0, common_1.Patch)('templates/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_template_dtos_1.UpdateJobTemplateDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateJobTemplate", null);
__decorate([
    (0, common_1.Delete)('templates/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "deleteJobTemplate", null);
__decorate([
    (0, common_1.Post)('requisitions/:templateId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_job_requisition_dto_1.CreateJobRequisitionDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createJobRequisition", null);
__decorate([
    (0, common_1.Get)('requisitions'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAllJobRequisitions", null);
__decorate([
    (0, common_1.Get)('requisitions/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getJobRequisition", null);
__decorate([
    (0, common_1.Patch)('requisitions/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_requisition_dto_1.UpdateJobRequisitionDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateJobRequisition", null);
__decorate([
    (0, common_1.Delete)('requisitions/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "deleteJobRequisition", null);
__decorate([
    (0, common_1.Post)('offers'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_offer_dto_1.CreateJobOfferDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createOffer", null);
__decorate([
    (0, common_1.Get)('offers'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAllOffers", null);
__decorate([
    (0, common_1.Get)('offers/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getOffer", null);
__decorate([
    (0, common_1.Patch)('offers/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_offer_dto_1.UpdateJobOfferDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateOffer", null);
__decorate([
    (0, common_1.Post)('referrals'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_referral_dto_1.CreateReferralDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createReferral", null);
__decorate([
    (0, common_1.Get)('referrals/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getReferral", null);
__decorate([
    (0, common_1.Post)('interviews'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interview_dto_1.CreateInterviewDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createInterview", null);
__decorate([
    (0, common_1.Get)('interviews'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAllInterviews", null);
__decorate([
    (0, common_1.Get)('interviews/panel-member/:userId'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getInterviewsByPanelMember", null);
__decorate([
    (0, common_1.Get)('interviews/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getInterview", null);
__decorate([
    (0, common_1.Patch)('interviews/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_interview_dto_1.UpdateInterviewDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateInterview", null);
__decorate([
    (0, common_1.Post)('feedback'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Get)('feedback'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAllFeedback", null);
__decorate([
    (0, common_1.Get)('feedback/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getFeedback", null);
__decorate([
    (0, common_1.Patch)('feedback/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_feedback_dto_1.UpdateFeedbackDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateFeedback", null);
__decorate([
    (0, common_1.Get)('applications/:id/history'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getApplicationHistory", null);
__decorate([
    (0, common_1.Post)('applications'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "createApplication", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getAllApplications", null);
__decorate([
    (0, common_1.Get)('applications/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE, employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getApplication", null);
__decorate([
    (0, common_1.Patch)('applications/:id'),
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.HR_MANAGER, employee_profile_enums_1.SystemRole.HR_EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_dto_1.UpdateApplicationDto]),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "updateApplication", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, common_1.Controller)('recruitment'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map