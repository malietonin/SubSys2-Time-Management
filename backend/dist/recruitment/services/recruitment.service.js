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
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const offer_schema_1 = require("../models/offer.schema");
const referral_schema_1 = require("../models/referral.schema");
const interview_schema_1 = require("../models/interview.schema");
const assessment_result_schema_1 = require("../models/assessment-result.schema");
const application_schema_1 = require("../models/application.schema");
const job_template_schema_1 = require("../models/job-template.schema");
const job_requisition_schema_1 = require("../models/job-requisition.schema");
const onboarding_schema_1 = require("../models/onboarding.schema");
const application_status_enum_1 = require("../enums/application-status.enum");
const contract_schema_1 = require("../models/contract.schema");
const notification_log_service_1 = require("../../time-management/services/notification-log.service");
const application_stage_enum_1 = require("../enums/application-stage.enum");
const application_history_schema_1 = require("../models/application-history.schema");
const onboarding_service_1 = require("./onboarding.service");
const offer_response_status_enum_1 = require("../enums/offer-response-status.enum");
const onboarding_task_status_enum_1 = require("../enums/onboarding-task-status.enum");
let RecruitmentService = class RecruitmentService {
    offerModel;
    referralModel;
    interviewModel;
    assessmentResultModel;
    applicationModel;
    jobTemplateModel;
    jobRequisitionModel;
    onboardingModel;
    contractModel;
    applicationHistoryModel;
    notificationLogService;
    onboardingService;
    constructor(offerModel, referralModel, interviewModel, assessmentResultModel, applicationModel, jobTemplateModel, jobRequisitionModel, onboardingModel, contractModel, applicationHistoryModel, notificationLogService, onboardingService) {
        this.offerModel = offerModel;
        this.referralModel = referralModel;
        this.interviewModel = interviewModel;
        this.assessmentResultModel = assessmentResultModel;
        this.applicationModel = applicationModel;
        this.jobTemplateModel = jobTemplateModel;
        this.jobRequisitionModel = jobRequisitionModel;
        this.onboardingModel = onboardingModel;
        this.contractModel = contractModel;
        this.applicationHistoryModel = applicationHistoryModel;
        this.notificationLogService = notificationLogService;
        this.onboardingService = onboardingService;
    }
    async createOffer(jobOfferData) {
        const newOffer = new this.offerModel(jobOfferData);
        const savedOffer = await newOffer.save();
        await this.notificationLogService.sendNotification({
            to: savedOffer.candidateId,
            type: 'Job Offer',
            message: 'Congratulations! Please review your job offer.',
        });
        return savedOffer;
    }
    async getAllOffers() {
        return this.offerModel
            .find()
            .populate('applicationId')
            .exec();
    }
    async getOffer(id) {
        const offer = await this.offerModel
            .findById(id)
            .exec();
        if (!offer)
            throw new common_1.NotFoundException('offer not found');
        return offer;
    }
    async updateOffer(id, jobOfferData) {
        const currentOffer = await this.offerModel.findById(id);
        if (!currentOffer)
            throw new common_1.NotFoundException('offer not found');
        const updatedOffer = await this.offerModel.findByIdAndUpdate(id, jobOfferData, { new: true });
        if (!updatedOffer)
            throw new common_1.NotFoundException('offer not found');
        if (currentOffer.applicantResponse !== offer_response_status_enum_1.OfferResponseStatus.ACCEPTED && updatedOffer.applicantResponse === offer_response_status_enum_1.OfferResponseStatus.ACCEPTED) {
            const startDate = updatedOffer.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            await this.onboardingService.createOnboardingTask({
                employeeId: updatedOffer.candidateId.toString(),
                tasks: [
                    {
                        name: 'Contract Signing',
                        department: 'HR',
                        status: onboarding_task_status_enum_1.OnboardingTaskStatus.PENDING,
                        deadline: new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000),
                        notes: 'Review and sign employment contract before start date',
                    },
                    {
                        name: 'Complete Personal Forms',
                        department: 'HR',
                        status: onboarding_task_status_enum_1.OnboardingTaskStatus.PENDING,
                        deadline: new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000),
                        notes: 'Fill out tax forms, emergency contact, and bank details',
                    },
                    {
                        name: 'Submit Required Documents',
                        department: 'HR',
                        status: onboarding_task_status_enum_1.OnboardingTaskStatus.PENDING,
                        deadline: new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000),
                        notes: 'Upload ID, certificates, and other required documents',
                    },
                ],
                completed: false,
            });
            await this.notificationLogService.sendNotification({
                to: updatedOffer.candidateId,
                type: 'Pre-Boarding Tasks',
                message: 'Welcome! Please complete your pre-boarding tasks before your start date: contract signing, personal forms, and document submission.',
            });
        }
        return updatedOffer;
    }
    async createReferral(referralData) {
        const newReferral = new this.referralModel(referralData);
        return newReferral.save();
    }
    async getReferral(id) {
        const referral = await this.referralModel.findById(id).exec();
        if (!referral)
            throw new common_1.NotFoundException('referral not found');
        return referral;
    }
    async createInterview(interviewData) {
        const newInterview = new this.interviewModel(interviewData);
        const application = await this.applicationModel.findById(newInterview.applicationId).exec();
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        const savedInterview = await newInterview.save();
        await this.notificationLogService.sendNotification({
            to: application.candidateId,
            type: 'Interview Scheduled',
            message: `Your interview has been scheduled.\nDate: ${savedInterview.scheduledDate}\nMethod: ${savedInterview.method}\n${savedInterview.videoLink ? `Link: ${savedInterview.videoLink}` : ''}`,
        });
        if (savedInterview.panel && savedInterview.panel.length > 0) {
            for (const panelMemberId of savedInterview.panel) {
                await this.notificationLogService.sendNotification({
                    to: panelMemberId,
                    type: 'Interview Panel Assignment',
                    message: `You have been assigned to an interview panel.\nDate: ${savedInterview.scheduledDate}\nStage: ${savedInterview.stage}\nMethod: ${savedInterview.method}\n${savedInterview.videoLink ? `Link: ${savedInterview.videoLink}` : ''}`,
                });
            }
        }
        return savedInterview;
    }
    async getAllInterviews() {
        return this.interviewModel.find().exec();
    }
    async getInterview(id) {
        const interview = await this.interviewModel.findById(id).exec();
        if (!interview)
            throw new common_1.NotFoundException('interview not found');
        return interview;
    }
    async updateInterview(id, interviewData) {
        const updatedInterview = await this.interviewModel.findByIdAndUpdate(id, interviewData, { new: true });
        if (!updatedInterview)
            throw new common_1.NotFoundException('interview not found');
        return updatedInterview;
    }
    async getInterviewsByPanelMember(userId) {
        return this.interviewModel
            .find({ panel: userId })
            .populate('applicationId')
            .sort({ scheduledDate: 1 })
            .exec();
    }
    async createFeedback(feedbackData) {
        const newFeedback = new this.assessmentResultModel(feedbackData);
        const savedFeedback = await newFeedback.save();
        await this.interviewModel.findByIdAndUpdate(feedbackData.interviewId, { feedbackId: savedFeedback._id });
        return newFeedback.save();
    }
    async getAllFeedback() {
        return this.assessmentResultModel.find().exec();
    }
    async getFeedback(id) {
        const feedback = await this.assessmentResultModel.findById(id).exec();
        if (!feedback)
            throw new common_1.NotFoundException('feedback not found');
        return feedback;
    }
    async updateFeedback(id, feedbackData) {
        const updatedFeedback = await this.assessmentResultModel.findByIdAndUpdate(id, feedbackData, { new: true });
        if (!updatedFeedback)
            throw new common_1.NotFoundException('feedback not found');
        return updatedFeedback;
    }
    async createApplication(applicationData) {
        const newApplication = new this.applicationModel(applicationData);
        await this.notificationLogService.sendNotification({
            to: newApplication.candidateId,
            type: 'Application Submitted',
            message: 'Your application has been successfully submitted.',
        });
        return newApplication.save();
    }
    async getAllApplications() {
        return this.applicationModel
            .find()
            .populate('requisitionId')
            .exec();
    }
    async getApplication(id) {
        const application = await this.applicationModel
            .findById(id)
            .populate('requisitionId')
            .exec();
        if (!application)
            throw new common_1.NotFoundException('application not found');
        return application;
    }
    async updateApplication(id, applicationData) {
        const currentApplication = await this.applicationModel.findById(id);
        if (!currentApplication)
            throw new common_1.NotFoundException('Application not found');
        const updatedApplication = await this.applicationModel.findByIdAndUpdate(id, applicationData, { new: true });
        if (!updatedApplication)
            throw new common_1.NotFoundException('Application not found');
        if (currentApplication.currentStage !== updatedApplication.currentStage || currentApplication.status !== updatedApplication.status) {
            const changedBy = updatedApplication.assignedHr;
            await this.createApplicationHistory({
                applicationId: updatedApplication._id,
                oldStage: currentApplication.currentStage,
                newStage: updatedApplication.currentStage,
                oldStatus: currentApplication.status,
                newStatus: updatedApplication.status,
                changedBy: changedBy,
            });
        }
        if (!currentApplication.assignedHr && updatedApplication.assignedHr) {
            await this.notificationLogService.sendNotification({
                to: updatedApplication.candidateId,
                type: 'Application In Process',
                message: 'Your application is now being reviewed by our HR team.',
            });
        }
        if (currentApplication.currentStage !== updatedApplication.currentStage) {
            let stageMessage = '';
            switch (updatedApplication.currentStage) {
                case application_stage_enum_1.ApplicationStage.SCREENING:
                    stageMessage = 'Your application is being screened by our recruitment team.';
                    break;
                case application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW:
                    stageMessage = 'Your application has progressed to the department interview stage.';
                    break;
                case application_stage_enum_1.ApplicationStage.HR_INTERVIEW:
                    stageMessage = 'Your application has progressed to the HR interview stage.';
                    break;
                case application_stage_enum_1.ApplicationStage.OFFER:
                    stageMessage = 'Congratulations! Your application has reached the offer stage.';
                    break;
                default:
                    stageMessage = `Your application stage has been updated to: ${updatedApplication.currentStage}`;
            }
            await this.notificationLogService.sendNotification({
                to: updatedApplication.candidateId,
                type: 'Application Stage Update',
                message: stageMessage,
            });
        }
        if (currentApplication.status !== updatedApplication.status) {
            let statusMessage = '';
            switch (updatedApplication.status) {
                case application_status_enum_1.ApplicationStatus.SUBMITTED:
                    statusMessage = 'Your application has been submitted successfully.';
                    break;
                case application_status_enum_1.ApplicationStatus.IN_PROCESS:
                    statusMessage = 'Your application is currently being processed.';
                    break;
                case application_status_enum_1.ApplicationStatus.OFFER:
                    statusMessage = 'Congratulations! You have received a job offer. HR will contact you with details soon.';
                    break;
                case application_status_enum_1.ApplicationStatus.HIRED:
                    statusMessage = 'Congratulations! You have been hired. Welcome to the team!';
                    break;
                case application_status_enum_1.ApplicationStatus.REJECTED:
                    statusMessage = 'Thank you for your interest. Unfortunately, we have decided to move forward with other candidates.';
                    break;
                default:
                    statusMessage = `Your application status has been updated to: ${updatedApplication.status}`;
            }
            await this.notificationLogService.sendNotification({
                to: updatedApplication.candidateId,
                type: 'Application Status Update',
                message: statusMessage,
            });
        }
        return updatedApplication;
    }
    async createApplicationHistory(historyData) {
        const newHistory = new this.applicationHistoryModel(historyData);
        return newHistory.save();
    }
    async getApplicationHistory(applicationId) {
        return this.applicationHistoryModel.find({ applicationId }).populate('changedBy').sort({ createdAt: -1 }).exec();
    }
    async createJobTemplate(jobTemplateData) {
        const newJobTemplate = new this.jobTemplateModel(jobTemplateData);
        return newJobTemplate.save();
    }
    async getAllJobTemplates() {
        return this.jobTemplateModel.find().exec();
    }
    async getJobTemplate(id) {
        const template = await this.jobTemplateModel.findById(id).exec();
        if (!template)
            throw new common_1.NotFoundException('template not found');
        return template;
    }
    async updateJobTemplate(templateId, dto) {
        const updatedTemplate = await this.jobTemplateModel.findByIdAndUpdate(templateId, dto, {
            new: true,
            runValidators: true,
        });
        if (!updatedTemplate)
            throw new common_1.NotFoundException('template not found');
        return updatedTemplate;
    }
    async deleteJobTemplate(id) {
        const deletedTemplate = await this.jobTemplateModel.findByIdAndDelete(id).exec();
        if (!deletedTemplate)
            throw new common_1.NotFoundException('template not found');
        return deletedTemplate;
    }
    async createJobRequisition(requisitionData, templateId) {
        const template = await this.jobTemplateModel.findById(templateId);
        if (!template)
            throw new common_1.NotFoundException('template not found');
        const newRequisition = new this.jobRequisitionModel({
            ...requisitionData,
            templateId,
        });
        return newRequisition.save();
    }
    async getAllJobRequisitions() {
        return this.jobRequisitionModel.find().populate('templateId').exec();
    }
    async getJobRequisition(id) {
        const requisition = await this.jobRequisitionModel.findById(id).populate('templateId').exec();
        if (!requisition)
            throw new common_1.NotFoundException('requisition not found');
        return requisition;
    }
    async updateJobRequisition(requisitionId, dto) {
        const updatedRequisition = await this.jobRequisitionModel.findByIdAndUpdate(requisitionId, dto, {
            new: true,
            runValidators: true,
        });
        if (!updatedRequisition)
            throw new common_1.NotFoundException('requisition not found');
        return updatedRequisition;
    }
    async deleteJobRequisition(id) {
        const deletedRequisition = await this.jobRequisitionModel.findByIdAndDelete(id).exec();
        if (!deletedRequisition)
            throw new common_1.NotFoundException('requisition not found');
        return deletedRequisition;
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(offer_schema_1.Offer.name)),
    __param(1, (0, mongoose_1.InjectModel)(referral_schema_1.Referral.name)),
    __param(2, (0, mongoose_1.InjectModel)(interview_schema_1.Interview.name)),
    __param(3, (0, mongoose_1.InjectModel)(assessment_result_schema_1.AssessmentResult.name)),
    __param(4, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __param(5, (0, mongoose_1.InjectModel)(job_template_schema_1.JobTemplate.name)),
    __param(6, (0, mongoose_1.InjectModel)(job_requisition_schema_1.JobRequisition.name)),
    __param(7, (0, mongoose_1.InjectModel)(onboarding_schema_1.Onboarding.name)),
    __param(8, (0, mongoose_1.InjectModel)(contract_schema_1.Contract.name)),
    __param(9, (0, mongoose_1.InjectModel)(application_history_schema_1.ApplicationStatusHistory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_log_service_1.NotificationLogService,
        onboarding_service_1.OnboardingService])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map