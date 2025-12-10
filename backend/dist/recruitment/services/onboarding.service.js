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
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const onboarding_schema_1 = require("../models/onboarding.schema");
const contract_schema_1 = require("../models/contract.schema");
const notification_log_service_1 = require("../../time-management/services/notification-log.service");
const offer_schema_1 = require("../models/offer.schema");
const application_schema_1 = require("../models/application.schema");
const application_status_enum_1 = require("../enums/application-status.enum");
const document_schema_1 = require("../models/document.schema");
const employee_profile_service_1 = require("../../employee-profile/employee-profile.service");
const employee_profile_enums_1 = require("../../employee-profile/enums/employee-profile.enums");
const payroll_execution_service_1 = require("../../payroll-execution/payroll-execution.service");
const payrollRuns_schema_1 = require("../../payroll-execution/models/payrollRuns.schema");
const employeePayrollDetails_schema_1 = require("../../payroll-execution/models/employeePayrollDetails.schema");
const EmployeeSigningBonus_schema_1 = require("../../payroll-execution/models/EmployeeSigningBonus.schema");
const signingBonus_schema_1 = require("../../payroll-configuration/models/signingBonus.schema");
const employee_role_service_1 = require("../../employee-profile/services/employee-role.service");
const auth_service_1 = require("../../auth/auth.service");
const payroll_configuration_service_1 = require("../../payroll-configuration/payroll-configuration.service");
const payroll_configuration_enums_1 = require("../../payroll-configuration/enums/payroll-configuration-enums");
const payroll_execution_enum_1 = require("../../payroll-execution/enums/payroll-execution-enum");
let OnboardingService = class OnboardingService {
    onboardingModel;
    contractModel;
    offerModel;
    documentModel;
    applicationModel;
    employeeSigningBonusModel;
    employeePayrollDetailsModel;
    payrollRunsModel;
    signingBonusConfigModel;
    notificationLogService;
    employeeCrudService;
    payrollExecutionService;
    employeeRoleService;
    authService;
    payrollConfigurationService;
    constructor(onboardingModel, contractModel, offerModel, documentModel, applicationModel, employeeSigningBonusModel, employeePayrollDetailsModel, payrollRunsModel, signingBonusConfigModel, notificationLogService, employeeCrudService, payrollExecutionService, employeeRoleService, authService, payrollConfigurationService) {
        this.onboardingModel = onboardingModel;
        this.contractModel = contractModel;
        this.offerModel = offerModel;
        this.documentModel = documentModel;
        this.applicationModel = applicationModel;
        this.employeeSigningBonusModel = employeeSigningBonusModel;
        this.employeePayrollDetailsModel = employeePayrollDetailsModel;
        this.payrollRunsModel = payrollRunsModel;
        this.signingBonusConfigModel = signingBonusConfigModel;
        this.notificationLogService = notificationLogService;
        this.employeeCrudService = employeeCrudService;
        this.payrollExecutionService = payrollExecutionService;
        this.employeeRoleService = employeeRoleService;
        this.authService = authService;
        this.payrollConfigurationService = payrollConfigurationService;
    }
    async createContract(contractData) {
        const newContract = new this.contractModel(contractData);
        return newContract.save();
    }
    async getAllContracts() {
        return this.contractModel.find().populate('offerId').populate('documentId').exec();
    }
    async getContractById(contractId) {
        const contract = await this.contractModel.findById(contractId).populate('offerId').populate('documentId').exec();
        if (!contract) {
            throw new common_1.NotFoundException(`Contract with ID ${contractId} not found`);
        }
        return contract;
    }
    async updateContract(contractId, contractData) {
        const currentContract = await this.contractModel.findById(contractId);
        if (!currentContract) {
            throw new common_1.NotFoundException(`Contract with ID ${contractId} not found`);
        }
        const updatedContract = await this.contractModel.findByIdAndUpdate(contractId, contractData, { new: true });
        if (!updatedContract) {
            throw new common_1.NotFoundException(`Contract with ID ${contractId} not found`);
        }
        const offer = await this.offerModel.findById(currentContract.offerId).exec();
        if (!offer) {
            throw new common_1.NotFoundException('Offer not found');
        }
        const candidateID = offer.candidateId;
        const hrManagerID = offer.hrEmployeeId;
        if (!currentContract.employeeSignedAt && updatedContract.employeeSignedAt) {
            await this.notificationLogService.sendNotification({
                to: hrManagerID,
                type: 'Contract Signed by Employee',
                message: `Employee has signed the contract for offer ${updatedContract.offerId}`,
            });
        }
        if (!currentContract.employerSignedAt && updatedContract.employerSignedAt) {
            await this.notificationLogService.sendNotification({
                to: candidateID,
                type: 'Contract Fully Executed',
                message: 'Your employment contract has been fully signed. Welcome aboard!',
            });
        }
        if (updatedContract.employeeSignedAt && updatedContract.employerSignedAt &&
            (!currentContract.employeeSignedAt || !currentContract.employerSignedAt)) {
            const application = await this.applicationModel.findById(offer.applicationId);
            if (application) {
                await this.applicationModel.findByIdAndUpdate(offer.applicationId, { status: application_status_enum_1.ApplicationStatus.HIRED }, { new: true });
                const payrollManagers = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER);
                if (!payrollManagers || payrollManagers.length === 0)
                    throw new common_1.NotFoundException('Payroll Managers not found');
                const payrollManager = payrollManagers[0];
                const systemAdmins = await this.employeeRoleService.getEmployeesByRole(employee_profile_enums_1.SystemRole.SYSTEM_ADMIN);
                if (!systemAdmins || systemAdmins.length === 0)
                    throw new common_1.NotFoundException('System Admins managers not found');
                const systemAdmin = systemAdmins[0];
                await this.notificationLogService.sendNotification({
                    to: payrollManager.id,
                    type: 'Payroll provisioning required',
                    message: `Require payroll provisioning for new hire ${candidateID}`,
                });
                await this.notificationLogService.sendNotification({
                    to: systemAdmin.id,
                    type: 'System access provisioning required',
                    message: `Require requires system access provisioning for new hire ${candidateID}`,
                });
                await this.notificationLogService.sendNotification({
                    to: systemAdmin._id,
                    type: 'Email access provisioning required',
                    message: `Require Email system access provisioning for new hire ${candidateID}`,
                });
                await this.notificationLogService.sendNotification({
                    to: systemAdmin.id,
                    type: 'New Hire Equipment Setup Required',
                    message: `New hire equipment and workspace setup needed for employee ID: ${offer.candidateId}. Please reserve: desk, laptop, access card, and other equipment.`,
                });
                try {
                    await this.authService.register({
                        employeeNumber: '--',
                        workEmail: '--',
                        password: '--',
                        firstName: '--',
                        lastName: '--',
                        nationalId: '--',
                        dateOfHire: new Date().toISOString(),
                    });
                    console.log('Employee account provisioned with placeholder data');
                }
                catch (error) {
                    console.error('Failed to provision employee account:', error);
                }
                try {
                    if (updatedContract.signingBonus && updatedContract.signingBonus > 0) {
                        const newSigningBonus = await this.payrollConfigurationService.createSigningBonuses({
                            positionName: updatedContract.role,
                            amount: updatedContract.signingBonus,
                            status: payroll_configuration_enums_1.ConfigStatus.DRAFT
                        });
                        await this.payrollExecutionService.approveSigningBonus(newSigningBonus?.id);
                    }
                }
                catch (error) {
                    console.error('Error processing signing bonus:', error);
                }
                try {
                    const contractSigningDate = updatedContract.employerSignedAt || new Date();
                    const payrollPeriodEnd = new Date(contractSigningDate.getFullYear(), contractSigningDate.getMonth() + 1, 0);
                    const existingPayrollRun = await this.payrollRunsModel.findOne({
                        payrollPeriod: payrollPeriodEnd,
                        status: payroll_execution_enum_1.PayRollStatus.DRAFT
                    }).exec();
                    if (!existingPayrollRun) {
                        console.warn('No draft payroll run found for this period.');
                    }
                    else {
                        console.log(`Found existing draft payroll run: ${existingPayrollRun.runId}`);
                        const initiationResult = await this.payrollExecutionService.startPayrollInitiation({
                            payrollRunId: existingPayrollRun._id.toString(),
                            payrollSpecialistId: payrollManager.id.toString(),
                        });
                        console.log(`Payroll initiation started: ${initiationResult.message}`);
                    }
                }
                catch (error) {
                    console.error('Error handling payroll initiation:', error);
                }
            }
        }
        return updatedContract;
    }
    async createOnboardingDocument(documentData) {
        const newDocument = new this.documentModel(documentData);
        return newDocument.save();
    }
    async getAllOnboardingDocuments() {
        return this.documentModel.find().exec();
    }
    async getOnboardingDocument(id) {
        const document = await this.documentModel.findById(id).exec();
        if (!document)
            throw new common_1.NotFoundException('Onboarding document not found');
        return document;
    }
    async getDocumentsByCandidate(candidateId) {
        return this.documentModel.find({ candidateId }).exec();
    }
    async getDocumentsByEmployee(employeeId) {
        return this.documentModel.find({ employeeId }).exec();
    }
    async updateOnboardingDocument(id, documentData) {
        const updatedDocument = await this.documentModel.findByIdAndUpdate(id, documentData, { new: true, runValidators: true });
        if (!updatedDocument)
            throw new common_1.NotFoundException('Onboarding document not found');
        return updatedDocument;
    }
    async deleteOnboardingDocument(id) {
        const deletedDocument = await this.documentModel.findByIdAndDelete(id).exec();
        if (!deletedDocument)
            throw new common_1.NotFoundException('Onboarding document not found');
        return deletedDocument;
    }
    async createOnboardingTask(createOnboardingDto) {
        const onboarding = await this.onboardingModel.create(createOnboardingDto);
        return onboarding;
    }
    async getAllTasks() {
        return this.onboardingModel.find().exec();
    }
    async getTaskById(taskId) {
        const onboarding = await this.onboardingModel.findById(taskId).exec();
        if (!onboarding) {
            throw new common_1.NotFoundException(`Onboarding record with ID ${taskId} not found`);
        }
        return onboarding;
    }
    async updateOnboardingTask(id, updateOnboardingDto) {
        const updatedOnboarding = await this.onboardingModel.findByIdAndUpdate(id, updateOnboardingDto, { new: true });
        if (!updatedOnboarding)
            throw new common_1.NotFoundException('Onboarding not found');
        return updatedOnboarding;
    }
    async deleteTask(taskId, taskIndex) {
        const onboarding = await this.onboardingModel.findById(taskId);
        if (!onboarding) {
            throw new common_1.NotFoundException(`Onboarding record with ID ${taskId} not found`);
        }
        if (taskIndex < 0 || taskIndex >= onboarding.tasks.length) {
            throw new common_1.BadRequestException('Invalid task index');
        }
        onboarding.tasks.splice(taskIndex, 1);
        return onboarding.save();
    }
    async deleteOnboardingRecord(onboardingId) {
        const result = await this.onboardingModel.findByIdAndDelete(onboardingId);
        if (!result) {
            throw new common_1.NotFoundException(`Onboarding record with ID ${onboardingId} not found`);
        }
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(onboarding_schema_1.Onboarding.name)),
    __param(1, (0, mongoose_1.InjectModel)(contract_schema_1.Contract.name)),
    __param(2, (0, mongoose_1.InjectModel)(offer_schema_1.Offer.name)),
    __param(3, (0, mongoose_1.InjectModel)(document_schema_1.Document.name)),
    __param(4, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __param(5, (0, mongoose_1.InjectModel)(EmployeeSigningBonus_schema_1.employeeSigningBonus.name)),
    __param(6, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __param(7, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(8, (0, mongoose_1.InjectModel)(signingBonus_schema_1.signingBonus.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_log_service_1.NotificationLogService,
        employee_profile_service_1.EmployeeProfileService,
        payroll_execution_service_1.PayrollExecutionService,
        employee_role_service_1.EmployeeRoleService,
        auth_service_1.AuthService,
        payroll_configuration_service_1.PayrollConfigurationService])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map