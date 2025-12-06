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
exports.LeaveTrackingController = void 0;
const common_1 = require("@nestjs/common");
const leave_tracking_service_1 = require("./leave-tracking.service");
const adjust_leave_dto_1 = require("../dto/adjust-leave.dto");
let LeaveTrackingController = class LeaveTrackingController {
    leaveTrackingService;
    constructor(leaveTrackingService) {
        this.leaveTrackingService = leaveTrackingService;
    }
    accrue() {
        return this.leaveTrackingService.accrueEntitlements();
    }
    adjust(dto) {
        return this.leaveTrackingService.adjustLeave(dto);
    }
    yearEnd() {
        return this.leaveTrackingService.yearEndProcessing();
    }
    encash(employeeId, dailySalary) {
        return this.leaveTrackingService.calculateEncashment(employeeId, Number(dailySalary));
    }
    getBalance(employeeId) {
        return this.leaveTrackingService.getLeaveBalances(employeeId);
    }
    async createSingleEntitlement(employeeId, leaveTypeId) {
        return this.leaveTrackingService.createSingleEntitlement(employeeId, leaveTypeId);
    }
};
exports.LeaveTrackingController = LeaveTrackingController;
__decorate([
    (0, common_1.Post)('accrue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveTrackingController.prototype, "accrue", null);
__decorate([
    (0, common_1.Post)('adjust'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adjust_leave_dto_1.AdjustLeaveDto]),
    __metadata("design:returntype", void 0)
], LeaveTrackingController.prototype, "adjust", null);
__decorate([
    (0, common_1.Post)('year-end'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveTrackingController.prototype, "yearEnd", null);
__decorate([
    (0, common_1.Get)('encash/:employeeId/:dailySalary'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('dailySalary')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LeaveTrackingController.prototype, "encash", null);
__decorate([
    (0, common_1.Get)('balance/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveTrackingController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('entitlement/:employeeId/:leaveTypeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('leaveTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeaveTrackingController.prototype, "createSingleEntitlement", null);
exports.LeaveTrackingController = LeaveTrackingController = __decorate([
    (0, common_1.Controller)('leave-tracking'),
    __metadata("design:paramtypes", [leave_tracking_service_1.LeaveTrackingService])
], LeaveTrackingController);
//# sourceMappingURL=leave-tracking.controller.js.map