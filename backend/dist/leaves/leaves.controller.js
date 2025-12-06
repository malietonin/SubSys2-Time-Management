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
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const leaves_service_1 = require("./leaves.service");
const create_leave_category_dto_1 = require("./dto/create-leave-category.dto");
const update_leave_category_dto_1 = require("./dto/update-leave-category.dto");
const create_leave_type_dto_1 = require("./dto/create-leave-type.dto");
const update_leave_type_dto_1 = require("./dto/update-leave-type.dto");
const create_leave_policy_dto_1 = require("./dto/create-leave-policy.dto");
const update_leave_policy_dto_1 = require("./dto/update-leave-policy.dto");
const create_calendar_dto_1 = require("./dto/create-calendar.dto");
const update_calendar_holiday_dto_1 = require("./dto/update-calendar-holiday.dto");
const update_calendar_blocked_dto_1 = require("./dto/update-calendar-blocked.dto");
const create_approval_workflow_dto_1 = require("./dto/create-approval-workflow.dto");
const update_approval_workflow_dto_1 = require("./dto/update-approval-workflow.dto");
const create_paycode_mapping_dto_1 = require("./dto/create-paycode-mapping.dto");
const update_paycode_mapping_dto_1 = require("./dto/update-paycode-mapping.dto");
const create_leave_request_dto_1 = require("./dto/create-leave-request.dto");
const update_leave_request_dto_1 = require("./dto/update-leave-request.dto");
let LeavesController = class LeavesController {
    service;
    constructor(service) {
        this.service = service;
    }
    createCategory(dto) {
        return this.service.createCategory(dto);
    }
    getAllCategories() {
        return this.service.getAllCategories();
    }
    updateCategory(id, dto) {
        return this.service.updateCategory(id, dto);
    }
    deleteCategory(id) {
        return this.service.deleteCategory(id);
    }
    createLeaveType(dto) {
        return this.service.createLeaveType(dto);
    }
    getAllLeaveTypes() {
        return this.service.getAllLeaveTypes();
    }
    updateLeaveType(id, dto) {
        return this.service.updateLeaveType(id, dto);
    }
    deleteLeaveType(id) {
        return this.service.deleteLeaveType(id);
    }
    createPolicy(dto) {
        return this.service.createPolicy(dto);
    }
    getAllPolicies() {
        return this.service.getAllPolicies();
    }
    updatePolicy(id, dto) {
        return this.service.updatePolicy(id, dto);
    }
    deletePolicy(id) {
        return this.service.deletePolicy(id);
    }
    createCalendar(dto) {
        return this.service.createCalendar(dto);
    }
    getCalendar(year) {
        return this.service.getCalendarByYear(Number(year));
    }
    addHoliday(year, dto) {
        return this.service.addHoliday(year, dto);
    }
    removeHoliday(year, dto) {
        return this.service.removeHoliday(year, dto);
    }
    addBlocked(year, dto) {
        return this.service.addBlockedPeriod(year, dto);
    }
    removeBlocked(year, index) {
        return this.service.removeBlockedPeriod(year, index);
    }
    createMapping(dto) {
        return this.service.createPaycodeMapping(dto);
    }
    getAllMappings() {
        return this.service.getAllPaycodeMappings();
    }
    updateMapping(id, dto) {
        return this.service.updatePaycodeMapping(id, dto);
    }
    deleteMapping(id) {
        return this.service.deletePaycodeMapping(id);
    }
    createWorkflow(dto) {
        return this.service.createApprovalWorkflow(dto);
    }
    getWorkflow(leaveTypeId) {
        return this.service.getApprovalWorkflow(leaveTypeId);
    }
    updateWorkflow(leaveTypeId, dto) {
        return this.service.updateApprovalWorkflow(leaveTypeId, dto);
    }
    createLeaveRequest(dto) {
        if (!dto.employeeId) {
            throw new common_2.BadRequestException('employeeId is required');
        }
        return this.service.createLeaveRequest(dto.employeeId, dto);
    }
    getAllLeaveRequests() {
        return this.service.getAllLeaveRequests();
    }
    getLeaveRequest(id) {
        return this.service.getLeaveRequest(id);
    }
    updateLeaveRequest(id, dto) {
        return this.service.updateLeaveRequest(id, dto);
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_category_dto_1.CreateLeaveCategoryDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_category_dto_1.UpdateLeaveCategoryDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Post)('types'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_type_dto_1.CreateLeaveTypeDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createLeaveType", null);
__decorate([
    (0, common_1.Get)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getAllLeaveTypes", null);
__decorate([
    (0, common_1.Patch)('types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_type_dto_1.UpdateLeaveTypeDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateLeaveType", null);
__decorate([
    (0, common_1.Delete)('types/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "deleteLeaveType", null);
__decorate([
    (0, common_1.Post)('policies'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_policy_dto_1.CreateLeavePolicyDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Get)('policies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getAllPolicies", null);
__decorate([
    (0, common_1.Patch)('policies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_policy_dto_1.UpdateLeavePolicyDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updatePolicy", null);
__decorate([
    (0, common_1.Delete)('policies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "deletePolicy", null);
__decorate([
    (0, common_1.Post)('calendar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calendar_dto_1.CreateCalendarDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createCalendar", null);
__decorate([
    (0, common_1.Get)('calendar/:year'),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getCalendar", null);
__decorate([
    (0, common_1.Patch)('calendar/:year/add-holiday'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_calendar_holiday_dto_1.UpdateCalendarHolidayDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "addHoliday", null);
__decorate([
    (0, common_1.Patch)('calendar/:year/remove-holiday'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_calendar_holiday_dto_1.UpdateCalendarHolidayDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "removeHoliday", null);
__decorate([
    (0, common_1.Patch)('calendar/:year/add-blocked'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_calendar_blocked_dto_1.UpdateCalendarBlockedDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "addBlocked", null);
__decorate([
    (0, common_1.Patch)('calendar/:year/remove-blocked/:index'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "removeBlocked", null);
__decorate([
    (0, common_1.Post)('paycode-mapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paycode_mapping_dto_1.CreatePaycodeMappingDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createMapping", null);
__decorate([
    (0, common_1.Get)('paycode-mapping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getAllMappings", null);
__decorate([
    (0, common_1.Patch)('paycode-mapping/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paycode_mapping_dto_1.UpdatePaycodeMappingDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateMapping", null);
__decorate([
    (0, common_1.Delete)('paycode-mapping/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "deleteMapping", null);
__decorate([
    (0, common_1.Post)('approval-workflow'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_approval_workflow_dto_1.CreateApprovalWorkflowDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createWorkflow", null);
__decorate([
    (0, common_1.Get)('approval-workflow/:leaveTypeId'),
    __param(0, (0, common_1.Param)('leaveTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getWorkflow", null);
__decorate([
    (0, common_1.Patch)('approval-workflow/:leaveTypeId'),
    __param(0, (0, common_1.Param)('leaveTypeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_approval_workflow_dto_1.UpdateApprovalWorkflowDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateWorkflow", null);
__decorate([
    (0, common_1.Post)('requests'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_request_dto_1.CreateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createLeaveRequest", null);
__decorate([
    (0, common_1.Get)('requests'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getAllLeaveRequests", null);
__decorate([
    (0, common_1.Get)('requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getLeaveRequest", null);
__decorate([
    (0, common_1.Patch)('requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_request_dto_1.UpdateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateLeaveRequest", null);
exports.LeavesController = LeavesController = __decorate([
    (0, common_1.Controller)('leaves'),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map