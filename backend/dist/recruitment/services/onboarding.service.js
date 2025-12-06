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
const payroll_execution_service_1 = require("../../payroll-execution/payroll-execution.service");
const payrollRuns_schema_1 = require("../../payroll-execution/models/payrollRuns.schema");
const employeePayrollDetails_schema_1 = require("../../payroll-execution/models/employeePayrollDetails.schema");
const EmployeeSigningBonus_schema_1 = require("../../payroll-execution/models/EmployeeSigningBonus.schema");
const signingBonus_schema_1 = require("../../payroll-configuration/models/signingBonus.schema");
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
    payrollExectutionService;
    constructor(onboardingModel, contractModel, offerModel, documentModel, applicationModel, employeeSigningBonusModel, employeePayrollDetailsModel, payrollRunsModel, signingBonusConfigModel, notificationLogService, employeeCrudService, payrollExectutionService) {
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
        this.payrollExectutionService = payrollExectutionService;
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
        if (updatedContract.employeeSignedAt &&
            updatedContract.employerSignedAt &&
            (!currentContract.employeeSignedAt || !currentContract.employerSignedAt)) {
            const application = await this.applicationModel.findById(offer.applicationId);
            if (application) {
                await this.applicationModel.findByIdAndUpdate(offer.applicationId, { status: application_status_enum_1.ApplicationStatus.HIRED }, { new: true });
                if (updatedContract.signingBonus && updatedContract.signingBonus > 0) {
                    const signingBonusConfig = await this.signingBonusConfigModel
                        .findOne({
                        status: 'APPROVED',
                    })
                        .sort({ createdAt: -1 })
                        .exec();
                    if (!signingBonusConfig) {
                        throw new common_1.NotFoundException('No approved signing bonus configuration found');
                    }
                    const signingBonusRecord = await this.employeeSigningBonusModel.create({
                        employeeId: candidateID,
                        signingBonusId: signingBonusConfig._id,
                        givenAmount: updatedContract.signingBonus,
                        paymentDate: null,
                        status: 'PENDING',
                    });
                    await this.notificationLogService.sendNotification({
                        to: hrManagerID,
                        type: 'Signing Bonus Approval Required',
                        message: `New hire signing bonus of ${updatedContract.signingBonus} requires approval for employee ${candidateID}`,
                    });
                }
                const currentDate = new Date();
                const currentPayrollRun = await this.payrollRunsModel.findOne({
                    payrollPeriod: {
                        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
                    },
                    status: { $in: ['DRAFT', 'IN_PROGRESS'] },
                });
                if (currentPayrollRun) {
                    await this.employeePayrollDetailsModel.create({
                        employeeId: candidateID,
                        payrollRunId: currentPayrollRun._id,
                        baseSalary: updatedContract.grossSalary,
                        allowances: 0,
                        deductions: 0,
                        netSalary: updatedContract.grossSalary,
                        netPay: updatedContract.grossSalary,
                        bankStatus: 'MISSING',
                        bonus: updatedContract.signingBonus || 0,
                        benefit: 0,
                        exceptions: `New hire - Start date: ${updatedContract.employerSignedAt}`,
                    });
                }
                await this.notificationLogService.sendNotification({
                    to: hrManagerID,
                    type: 'New Hire Equipment Setup Required',
                    message: `New hire equipment and workspace setup needed for employee ID: ${offer.candidateId}. Please reserve: desk, laptop, access card, and other equipment.`,
                });
                await this.notificationLogService.sendNotification({
                    to: hrManagerID,
                    type: 'System Access Provisioning Required',
                    message: `New hire requires system access provisioning for employee ID: ${offer.candidateId}. Please set up: Email account, Payroll system access, Internal systems access, VPN credentials, and other required system permissions.`,
                });
                await this.notificationLogService.sendNotification({
                    to: hrManagerID,
                    type: 'Email Account Setup Required',
                    message: `Please create email account and configure access for new hire (Employee ID: ${offer.candidateId}). Ensure email is active before Day 1.`,
                });
                await this.notificationLogService.sendNotification({
                    to: hrManagerID,
                    type: 'Payroll System Access Required',
                    message: `New hire needs payroll system access (Employee ID: ${offer.candidateId}). Please provision account and send credentials securely.`,
                });
                await this.notificationLogService.sendNotification({
                    to: candidateID,
                    type: 'Welcome! System Setup in Progress',
                    message: 'Welcome to the team! Our IT team is setting up your email, payroll access, and internal systems. You will receive your credentials before your start date.',
                });
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
        payroll_execution_service_1.PayrollExecutionService])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map