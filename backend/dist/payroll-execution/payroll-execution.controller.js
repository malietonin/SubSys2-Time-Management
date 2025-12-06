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
exports.PayrollExecutionController = void 0;
const common_1 = require("@nestjs/common");
const payroll_execution_service_1 = require("./payroll-execution.service");
const update_payroll_period_dto_1 = require("./dto/update-payroll-period.dto");
const start_payroll_run_dto_1 = require("./dto/start-payroll-run.dto");
const phase_0_dto_1 = require("./dto/phase-0.dto");
const payroll_phase1_1_service_1 = require("./payroll-phase1-1.service");
const generate_payroll_draft_dto_1 = require("./dto/generate-payroll-draft.dto");
const payroll_phase1_1A_service_1 = require("./payroll-phase1-1A.service");
const payroll_phase1_1B_service_1 = require("./payroll-phase1-1B.service");
const process_hr_events_dto_1 = require("./dto/process-hr-events.dto");
const phase_1_1B_dto_1 = require("./dto/phase-1-1B.dto");
const payroll_phase1_1C_service_1 = require("./payroll-phase1-1C.service");
const payroll_phase2_service_1 = require("./payroll-phase2.service");
const review_payroll_draft_dto_1 = require("./dto/review-payroll-draft.dto");
const payroll_phase3_service_1 = require("./payroll-phase3.service");
const phase3_dto_1 = require("./dto/phase3.dto");
const payroll_phase4_service_1 = require("./payroll-phase4.service");
const generate_payslips_dto_1 = require("./dto/generate-payslips.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
let PayrollExecutionController = class PayrollExecutionController {
    payrollExecutionService;
    phaseService;
    phase1AService;
    phase1BService;
    phase1CService;
    phase2Service;
    phase3Service;
    phase4Service;
    constructor(payrollExecutionService, phaseService, phase1AService, phase1BService, phase1CService, phase2Service, phase3Service, phase4Service) {
        this.payrollExecutionService = payrollExecutionService;
        this.phaseService = phaseService;
        this.phase1AService = phase1AService;
        this.phase1BService = phase1BService;
        this.phase1CService = phase1CService;
        this.phase2Service = phase2Service;
        this.phase3Service = phase3Service;
        this.phase4Service = phase4Service;
    }
    approveSigningBonus(id) {
        return this.payrollExecutionService.approveSigningBonus(id);
    }
    rejectSigningBonus(id) {
        return this.payrollExecutionService.rejectSigningBonus(id);
    }
    editSigningBonus(id, dto) {
        return this.payrollExecutionService.editSigningBonus(id, dto);
    }
    approveExitBenefits(id) {
        return this.payrollExecutionService.approveExitBenefits(id);
    }
    rejectExitBenefits(id) {
        return this.payrollExecutionService.rejectExitBenefits(id);
    }
    editExitBenefits(id, dto) {
        return this.payrollExecutionService.editExitBenefits(id, dto);
    }
    validatePhase0() {
        return this.payrollExecutionService.validatePhase0();
    }
    updatePayrollPeriod(dto) {
        return this.payrollExecutionService.updatePayrollPeriod(dto);
    }
    startPayrollInitiation(dto) {
        return this.payrollExecutionService.startPayrollInitiation(dto);
    }
    generateDraft(dto) {
        return this.phaseService.generatePayrollDraft(dto);
    }
    processHREvents(dto) {
        return this.phase1AService.processHREvents(dto);
    }
    applyPenalties(dto) {
        return this.phase1BService.applyPenalties(dto);
    }
    generateDraftFile(dto) {
        return this.phase1CService.generateDraftFile(dto);
    }
    reviewPayrollDraft(dto) {
        return this.phase2Service.reviewPayrollDraft(dto);
    }
    reviewPayroll(payrollRunId) {
        return this.phase3Service.reviewPayrollRun(payrollRunId);
    }
    managerApprove(dto) {
        return this.phase3Service.managerApprove(dto);
    }
    financeApprove(dto) {
        return this.phase3Service.financeApprove(dto);
    }
    lockPayroll(dto) {
        return this.phase3Service.lockPayroll(dto);
    }
    unfreezePayroll(dto) {
        return this.phase3Service.unfreezePayroll(dto);
    }
    generatePayslips(dto) {
        return this.phase4Service.generatePayslips(dto);
    }
};
exports.PayrollExecutionController = PayrollExecutionController;
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('signing-bonus/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "approveSigningBonus", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('signing-bonus/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "rejectSigningBonus", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Patch)('signing-bonus/:id/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, phase_0_dto_1.EditSigningBonusDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "editSigningBonus", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('exit-benefits/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "approveExitBenefits", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('exit-benefits/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "rejectExitBenefits", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Patch)('exit-benefits/:id/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, phase_0_dto_1.EditExitBenefitsDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "editExitBenefits", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Get)('phase-0/validate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "validatePhase0", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Put)('phase1/update-period'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_payroll_period_dto_1.UpdatePayrollPeriodDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "updatePayrollPeriod", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('phase1/start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [start_payroll_run_dto_1.StartPayrollRunDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "startPayrollInitiation", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('generate-draft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_payroll_draft_dto_1.GeneratePayrollDraftDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "generateDraft", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('process-hr-events'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [process_hr_events_dto_1.ProcessHREventsDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "processHREvents", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('apply-penalties'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phase_1_1B_dto_1.Phase1_1BDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "applyPenalties", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('generate-draft-file'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_payroll_draft_dto_1.GeneratePayrollDraftDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "generateDraftFile", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('phase2/review-draft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_payroll_draft_dto_1.ReviewPayrollDraftDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "reviewPayrollDraft", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    (0, common_1.Post)('phase3/review'),
    __param(0, (0, common_1.Body)('payrollRunId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "reviewPayroll", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    (0, common_1.Post)('phase3/manager-approve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phase3_dto_1.PayrollApproveDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "managerApprove", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.FINANCE_STAFF),
    (0, common_1.Post)('phase3/finance-approve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phase3_dto_1.PayrollApproveDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "financeApprove", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    (0, common_1.Patch)('phase3/lock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phase3_dto_1.LockPayrollDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "lockPayroll", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_MANAGER),
    (0, common_1.Patch)('phase3/unfreeze'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phase3_dto_1.UnfreezePayrollDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "unfreezePayroll", null);
__decorate([
    (0, roles_decorator_1.Roles)(employee_profile_enums_1.SystemRole.PAYROLL_SPECIALIST),
    (0, common_1.Post)('generate-payslips'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_payslips_dto_1.GeneratePayslipsDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "generatePayslips", null);
exports.PayrollExecutionController = PayrollExecutionController = __decorate([
    (0, common_1.Controller)('payroll-execution'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [payroll_execution_service_1.PayrollExecutionService,
        payroll_phase1_1_service_1.PayrollPhase1_1Service,
        payroll_phase1_1A_service_1.PayrollPhase1_1AService,
        payroll_phase1_1B_service_1.PayrollPhase1_1BService,
        payroll_phase1_1C_service_1.PayrollPhase1_1CService,
        payroll_phase2_service_1.PayrollPhase2Service,
        payroll_phase3_service_1.PayrollPhase3Service,
        payroll_phase4_service_1.PayrollPhase4Service])
], PayrollExecutionController);
//# sourceMappingURL=payroll-execution.controller.js.map