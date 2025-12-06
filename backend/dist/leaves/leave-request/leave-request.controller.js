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
exports.LeaveRequestController = void 0;
const common_1 = require("@nestjs/common");
const leave_request_service_1 = require("./leave-request.service");
const create_leave_request_dto_1 = require("../dto/create-leave-request.dto");
const decision_leave_request_dto_1 = require("../dto/decision-leave-request.dto");
let LeaveRequestController = class LeaveRequestController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.createRequest(dto);
    }
    async decide(dto) {
        return this.service.decideRequest(dto);
    }
    async cancel(requestId) {
        return this.service.cancelRequest(requestId);
    }
    async listForEmployee(employeeId, status) {
        return this.service.getRequestsForEmployee(employeeId, status);
    }
    async get(id) {
        return this.service.getRequestById(id);
    }
};
exports.LeaveRequestController = LeaveRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_request_dto_1.CreateLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('decision'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [decision_leave_request_dto_1.DecisionLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "decide", null);
__decorate([
    (0, common_1.Patch)('cancel/:requestId'),
    __param(0, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "cancel", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "listForEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "get", null);
exports.LeaveRequestController = LeaveRequestController = __decorate([
    (0, common_1.Controller)('leave-requests'),
    __metadata("design:paramtypes", [leave_request_service_1.LeaveRequestService])
], LeaveRequestController);
//# sourceMappingURL=leave-request.controller.js.map