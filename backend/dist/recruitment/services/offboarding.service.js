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
exports.OffboardingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const termination_request_schema_1 = require("../models/termination-request.schema");
const clearance_checklist_schema_1 = require("../models/clearance-checklist.schema");
const termination_status_enum_1 = require("../enums/termination-status.enum");
const termination_initiation_enum_1 = require("../enums/termination-initiation.enum");
const approval_status_enum_1 = require("../enums/approval-status.enum");
const employee_profile_enums_1 = require("../../employee-profile/enums/employee-profile.enums");
const notification_log_service_1 = require("../../time-management/services/notification-log.service");
const employee_crud_service_1 = require("../../employee-profile/services/employee-crud.service");
const employee_role_service_1 = require("../../employee-profile/services/employee-role.service");
const hr_admin_service_1 = require("../../employee-profile/services/hr-admin.service");
const performance_service_1 = require("../../performance/performance.service");
let OffboardingService = class OffboardingService {
    terminationRequestModel;
    clearanceChecklistModel;
    notificationLogService;
    hrAdminService;
    employeeCrudService;
    employeeRoleService;
    performanceService;
    constructor(terminationRequestModel, clearanceChecklistModel, notificationLogService, hrAdminService, employeeCrudService, employeeRoleService, performanceService) {
        this.terminationRequestModel = terminationRequestModel;
        this.clearanceChecklistModel = clearanceChecklistModel;
        this.notificationLogService = notificationLogService;
        this.hrAdminService = hrAdminService;
        this.employeeCrudService = employeeCrudService;
        this.employeeRoleService = employeeRoleService;
        this.performanceService = performanceService;
    }
    async createTerminationRequest(terminationRequestData) {
        let shouldCreateRequest = false;
        let performanceIssueDetected = false;
        if (terminationRequestData.initiator === termination_initiation_enum_1.TerminationInitiation.HR ||
            terminationRequestData.initiator === termination_initiation_enum_1.TerminationInitiation.MANAGER) {
            try {
                const employeeAppraisals = await this.performanceService.getEmployeeAppraisals(terminationRequestData.employeeId.toString());
                if (employeeAppraisals && employeeAppraisals.length > 0) {
                    const latestAppraisal = employeeAppraisals[0];
                    if (latestAppraisal.templateId && latestAppraisal.latestAppraisalId) {
                        const template = await this.performanceService.getAppraisalTemplateById(latestAppraisal.templateId.toString());
                        const appraisalRecord = await this.performanceService.getAppraisalRecordById(latestAppraisal.latestAppraisalId.toString());
                        if (appraisalRecord &&
                            appraisalRecord.totalScore !== undefined &&
                            template &&
                            template.ratingScale) {
                            if (appraisalRecord.totalScore < template.ratingScale.min) {
                                performanceIssueDetected = true;
                                shouldCreateRequest = true;
                                const newTerminationRequest = new this.terminationRequestModel(terminationRequestData);
                                const savedRequest = await newTerminationRequest.save();
                                await this.notificationLogService.sendNotification({
                                    to: savedRequest.employeeId,
                                    type: 'Termination Notice - Poor Performance',
                                    message: `A termination request has been initiated due to performance below minimum acceptable standards. Your latest appraisal score: ${appraisalRecord.totalScore}/${template.ratingScale.max} (Minimum required: ${template.ratingScale.min}). Reason: ${savedRequest.reason}. Please contact HR immediately.`,
                                });
                                const hrManagers = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.HR_MANAGER);
                                if (hrManagers && hrManagers.length > 0) {
                                    await this.notificationLogService.sendNotification({
                                        to: hrManagers[0].id,
                                        type: 'Termination Request - Below Minimum Performance',
                                        message: `Termination request created for employee ${savedRequest.employeeId}. Latest appraisal score ${appraisalRecord.totalScore}/${template.ratingScale.max} is below minimum of ${template.ratingScale.min}. Immediate action required.`,
                                    });
                                }
                                return savedRequest;
                            }
                            else {
                                throw new common_1.BadRequestException(`Cannot create termination request for performance reasons. Employee's latest appraisal score (${appraisalRecord.totalScore}/${template.ratingScale.max}) meets or exceeds minimum requirements (${template.ratingScale.min}).`);
                            }
                        }
                    }
                }
                if (!shouldCreateRequest) {
                    throw new common_1.BadRequestException('Cannot create termination request. No performance appraisal data found to justify termination.');
                }
            }
            catch (error) {
                if (error instanceof common_1.BadRequestException) {
                    throw error;
                }
                console.error('Error checking performance for termination:', error);
                throw new common_1.BadRequestException('Unable to verify performance data. Cannot create termination request.');
            }
        }
        if (terminationRequestData.initiator === termination_initiation_enum_1.TerminationInitiation.EMPLOYEE) {
            const newTerminationRequest = new this.terminationRequestModel(terminationRequestData);
            const savedRequest = await newTerminationRequest.save();
            await this.notificationLogService.sendNotification({
                to: savedRequest.employeeId,
                type: 'Resignation Request Submitted',
                message: 'Your resignation request has been submitted successfully and is pending HR review.',
            });
            const hrManagers = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.HR_MANAGER);
            if (hrManagers && hrManagers.length > 0) {
                await this.notificationLogService.sendNotification({
                    to: hrManagers[0].id,
                    type: 'New Resignation Request',
                    message: `Employee ${savedRequest.employeeId} has submitted a resignation request. Reason: ${savedRequest.reason}`,
                });
            }
            return savedRequest;
        }
        throw new common_1.BadRequestException('Invalid termination request');
    }
    async updateTerminationRequest(id, terminationRequestData) {
        const currentTerminationRequest = await this.terminationRequestModel.findById(id).exec();
        if (!currentTerminationRequest) {
            throw new common_1.NotFoundException('Termination request not found');
        }
        const updatedTerminationRequest = await this.terminationRequestModel.findByIdAndUpdate(id, terminationRequestData, { new: true });
        if (!updatedTerminationRequest) {
            throw new common_1.NotFoundException('Termination request not found');
        }
        if (currentTerminationRequest.status !== termination_status_enum_1.TerminationStatus.UNDER_REVIEW && updatedTerminationRequest.status === termination_status_enum_1.TerminationStatus.UNDER_REVIEW) {
            await this.notificationLogService.sendNotification({
                to: updatedTerminationRequest.employeeId,
                type: 'Resignation Request Under Review',
                message: 'Your resignation request is now being reviewed by HR. You will be notified once a decision is made.',
            });
        }
        if (currentTerminationRequest.status !== termination_status_enum_1.TerminationStatus.APPROVED &&
            updatedTerminationRequest.status === termination_status_enum_1.TerminationStatus.APPROVED) {
            const terminationDateStr = updatedTerminationRequest.terminationDate
                ? new Date(updatedTerminationRequest.terminationDate).toLocaleDateString()
                : 'to be determined';
            await this.notificationLogService.sendNotification({
                to: updatedTerminationRequest.employeeId,
                type: 'Resignation Request Approved',
                message: `Your resignation request has been approved. Your last working day will be ${terminationDateStr}. Please complete your clearance checklist before departure.`,
            });
            const payrollManagers = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER);
            if (payrollManagers && payrollManagers.length > 0) {
                await this.notificationLogService.sendNotification({
                    to: payrollManagers[0].id,
                    type: 'Final Pay Calculation Required',
                    message: `Employee ${updatedTerminationRequest.employeeId} termination approved. Last working day: ${terminationDateStr}. Please calculate: unused leave days, final salary, deductions, and prepare settlement. Termination ID: ${id}`,
                });
            }
            const hrManagers = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.HR_MANAGER);
            if (hrManagers && hrManagers.length > 0) {
                await this.notificationLogService.sendNotification({
                    to: hrManagers[0].id,
                    type: 'Benefits Termination Required',
                    message: `Employee ${updatedTerminationRequest.employeeId} termination approved. Last working day: ${terminationDateStr}. Please process: Health insurance termination, benefits cancellation, final settlements. Termination ID: ${id}`,
                });
            }
            const systemAdmins = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN);
            if (systemAdmins && systemAdmins.length > 0) {
                await this.notificationLogService.sendNotification({
                    to: systemAdmins[0].id,
                    type: 'Revoke System Access',
                    message: `Employee ${updatedTerminationRequest.employeeId} termination approved. Please revoke: Email access, VPN credentials, Internal system access, Database permissions. Termination date: ${terminationDateStr}`,
                });
            }
            const financialStaff = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.FINANCE_STAFF);
            if (financialStaff && financialStaff.length > 0) {
                await this.notificationLogService.sendNotification({
                    to: financialStaff[0].id,
                    type: 'financial signature needed',
                    message: `Employee ${updatedTerminationRequest.employeeId} termination approved. Please sign off for the employee's financial records. Termination date: ${terminationDateStr}`,
                });
            }
            const systemAdminUserId = systemAdmins && systemAdmins.length > 0 ? systemAdmins[0].employeeProfileId.toString() : 'SYSTEM';
            await this.hrAdminService.deactivateEmployee(updatedTerminationRequest.employeeId.toString(), systemAdminUserId, employee_profile_enums_1.SystemRole.SYSTEM_ADMIN, employee_profile_enums_1.EmployeeStatus.TERMINATED, updatedTerminationRequest.terminationDate || new Date());
        }
        if (currentTerminationRequest.status !== termination_status_enum_1.TerminationStatus.REJECTED &&
            updatedTerminationRequest.status === termination_status_enum_1.TerminationStatus.REJECTED) {
            await this.notificationLogService.sendNotification({
                to: updatedTerminationRequest.employeeId,
                type: 'Resignation Request Rejected',
                message: `Your resignation request has been rejected. ${updatedTerminationRequest.hrComments || 'Please contact HR for more information.'}`,
            });
        }
        return updatedTerminationRequest;
    }
    async getAllTerminationRequests(employeeId) {
        const filter = employeeId ? { employeeId } : {};
        return this.terminationRequestModel.find(filter).exec();
    }
    async getTerminationRequest(id) {
        const terminationRequest = await this.terminationRequestModel.findById(id).exec();
        if (!terminationRequest) {
            throw new common_1.NotFoundException('Termination request not found');
        }
        return terminationRequest;
    }
    async createClearanceChecklist(clearanceChecklistData) {
        const newClearanceChecklist = new this.clearanceChecklistModel(clearanceChecklistData);
        const savedChecklist = await newClearanceChecklist.save();
        const terminationRequest = await this.terminationRequestModel.findById(savedChecklist.terminationId).exec();
        if (terminationRequest) {
            await this.notificationLogService.sendNotification({
                to: terminationRequest.employeeId,
                type: 'Clearance Checklist Created',
                message: 'Your offboarding clearance checklist has been created. Please complete all items before your last working day.',
            });
        }
        return savedChecklist;
    }
    async getAllClearanceChecklists(terminationId) {
        const filter = terminationId ? { terminationId } : {};
        return this.clearanceChecklistModel.find(filter).exec();
    }
    async getClearanceChecklist(id) {
        const clearanceChecklist = await this.clearanceChecklistModel.findById(id).exec();
        if (!clearanceChecklist) {
            throw new common_1.NotFoundException('Clearance checklist not found');
        }
        return clearanceChecklist;
    }
    async updateClearanceChecklist(id, clearanceChecklistData) {
        const currentChecklist = await this.clearanceChecklistModel.findById(id).exec();
        if (!currentChecklist) {
            throw new common_1.NotFoundException('Clearance checklist not found');
        }
        const updatedClearanceChecklist = await this.clearanceChecklistModel.findByIdAndUpdate(id, clearanceChecklistData, { new: true });
        if (!updatedClearanceChecklist) {
            throw new common_1.NotFoundException('Clearance checklist not found');
        }
        const allItemsCompleted = updatedClearanceChecklist.items?.every(item => item.status === approval_status_enum_1.ApprovalStatus.APPROVED) ?? false;
        const allEquipmentReturned = updatedClearanceChecklist.equipmentList?.every(eq => eq.returned) ?? false;
        const cardReturned = updatedClearanceChecklist.cardReturned ?? false;
        const terminationRequest = await this.terminationRequestModel.findById(updatedClearanceChecklist.terminationId).exec();
        if (terminationRequest) {
            if (allItemsCompleted && allEquipmentReturned && cardReturned) {
                await this.notificationLogService.sendNotification({
                    to: terminationRequest.employeeId,
                    type: 'Clearance Checklist Completed',
                    message: 'Congratulations! You have completed all clearance checklist items from all departments (IT, Finance, Facilities, Manager). Your final settlement will be processed shortly.',
                });
                await this.notificationLogService.sendNotification({
                    to: terminationRequest.employeeId,
                    type: 'Clearance Complete - Process Final Settlement',
                    message: `Employee ${terminationRequest.employeeId} has completed all clearance items. All departments have signed off (IT, Finance, Facilities, Manager). All equipment returned. Please process final settlement and close termination request ${updatedClearanceChecklist.terminationId}.`,
                });
            }
        }
        return updatedClearanceChecklist;
    }
    async deleteClearanceChecklist(id) {
        const deletedClearanceChecklist = await this.clearanceChecklistModel.findByIdAndDelete(id);
        if (!deletedClearanceChecklist) {
            throw new common_1.NotFoundException('Clearance checklist not found');
        }
        return deletedClearanceChecklist;
    }
};
exports.OffboardingService = OffboardingService;
exports.OffboardingService = OffboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(termination_request_schema_1.TerminationRequest.name)),
    __param(1, (0, mongoose_1.InjectModel)(clearance_checklist_schema_1.ClearanceChecklist.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notification_log_service_1.NotificationLogService,
        hr_admin_service_1.HrAdminService,
        employee_crud_service_1.EmployeeCrudService,
        employee_role_service_1.EmployeeRoleService,
        performance_service_1.PerformanceService])
], OffboardingService);
//# sourceMappingURL=offboarding.service.js.map