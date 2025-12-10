"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_template_schema_1 = require("./models/job-template.schema");
const job_requisition_schema_1 = require("./models/job-requisition.schema");
const application_schema_1 = require("./models/application.schema");
const application_history_schema_1 = require("./models/application-history.schema");
const interview_schema_1 = require("./models/interview.schema");
const assessment_result_schema_1 = require("./models/assessment-result.schema");
const referral_schema_1 = require("./models/referral.schema");
const offer_schema_1 = require("./models/offer.schema");
const contract_schema_1 = require("./models/contract.schema");
const document_schema_1 = require("./models/document.schema");
const termination_request_schema_1 = require("./models/termination-request.schema");
const clearance_checklist_schema_1 = require("./models/clearance-checklist.schema");
const onboarding_schema_1 = require("./models/onboarding.schema");
const recruitment_controller_1 = require("./controllers/recruitment.controller");
const onboarding_controller_1 = require("./controllers/onboarding.controller");
const offboarding_controller_1 = require("./controllers/offboarding.controller");
const recruitment_service_1 = require("./services/recruitment.service");
const onboarding_service_1 = require("./services/onboarding.service");
const offboarding_service_1 = require("./services/offboarding.service");
const auth_module_1 = require("../auth/auth.module");
const performance_module_1 = require("../performance/performance.module");
const payroll_execution_module_1 = require("../payroll-execution/payroll-execution.module");
const payroll_configuration_module_1 = require("../payroll-configuration/payroll-configuration.module");
const employee_profile_module_1 = require("../employee-profile/employee-profile.module");
const time_management_module_1 = require("../time-management/time-management.module");
let RecruitmentModule = class RecruitmentModule {
};
exports.RecruitmentModule = RecruitmentModule;
exports.RecruitmentModule = RecruitmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: onboarding_schema_1.Onboarding.name, schema: onboarding_schema_1.OnboardingSchema },
                { name: job_template_schema_1.JobTemplate.name, schema: job_template_schema_1.JobTemplateSchema },
                { name: job_requisition_schema_1.JobRequisition.name, schema: job_requisition_schema_1.JobRequisitionSchema },
                { name: application_schema_1.Application.name, schema: application_schema_1.ApplicationSchema },
                { name: application_history_schema_1.ApplicationStatusHistory.name, schema: application_history_schema_1.ApplicationStatusHistorySchema },
                { name: interview_schema_1.Interview.name, schema: interview_schema_1.InterviewSchema },
                { name: assessment_result_schema_1.AssessmentResult.name, schema: assessment_result_schema_1.AssessmentResultSchema },
                { name: referral_schema_1.Referral.name, schema: referral_schema_1.ReferralSchema },
                { name: offer_schema_1.Offer.name, schema: offer_schema_1.OfferSchema },
                { name: contract_schema_1.Contract.name, schema: contract_schema_1.ContractSchema },
                { name: document_schema_1.Document.name, schema: document_schema_1.DocumentSchema },
                { name: termination_request_schema_1.TerminationRequest.name, schema: termination_request_schema_1.TerminationRequestSchema },
                { name: clearance_checklist_schema_1.ClearanceChecklist.name, schema: clearance_checklist_schema_1.ClearanceChecklistSchema },
            ]),
            employee_profile_module_1.EmployeeProfileModule,
            time_management_module_1.TimeManagementModule,
            auth_module_1.AuthModule,
            performance_module_1.PerformanceModule,
            payroll_execution_module_1.PayrollExecutionModule,
            payroll_configuration_module_1.PayrollConfigurationModule
        ],
        controllers: [
            recruitment_controller_1.RecruitmentController,
            onboarding_controller_1.OnboardingController,
            offboarding_controller_1.OffboardingController,
        ],
        providers: [
            recruitment_service_1.RecruitmentService,
            onboarding_service_1.OnboardingService,
            offboarding_service_1.OffboardingService,
        ],
        exports: [
            recruitment_service_1.RecruitmentService,
            onboarding_service_1.OnboardingService,
            offboarding_service_1.OffboardingService,
        ]
    })
], RecruitmentModule);
//# sourceMappingURL=recruitment.module.js.map