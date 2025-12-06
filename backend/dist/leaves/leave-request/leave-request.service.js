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
var LeaveRequestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_request_schema_1 = require("../models/leave-request.schema");
const approval_workflow_schema_1 = require("../models/approval-workflow.schema");
const leave_entitlement_schema_1 = require("../models/leave-entitlement.schema");
const leave_policy_schema_1 = require("../models/leave-policy.schema");
const calendar_schema_1 = require("../models/calendar.schema");
const leave_type_schema_1 = require("../models/leave-type.schema");
const leave_status_enum_1 = require("../enums/leave-status.enum");
const adjustment_type_enum_1 = require("../enums/adjustment-type.enum");
let LeaveRequestService = LeaveRequestService_1 = class LeaveRequestService {
    requestModel;
    workflowModel;
    entitlementModel;
    policyModel;
    calendarModel;
    typeModel;
    logger = new common_1.Logger(LeaveRequestService_1.name);
    constructor(requestModel, workflowModel, entitlementModel, policyModel, calendarModel, typeModel) {
        this.requestModel = requestModel;
        this.workflowModel = workflowModel;
        this.entitlementModel = entitlementModel;
        this.policyModel = policyModel;
        this.calendarModel = calendarModel;
        this.typeModel = typeModel;
    }
    async calculateNetDays(start, end) {
        const year = start.getFullYear();
        const calendar = await this.calendarModel.findOne({ year }).lean().exec();
        const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
        let count = 0;
        for (let i = 0; i < totalDays; i++) {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            const day = d.getDay();
            const isWeekend = (day === 5 || day === 6);
            if (isWeekend)
                continue;
            if (calendar && calendar.holidays && calendar.holidays.length) {
                const isHoliday = calendar.holidays.some((h) => {
                    const hd = new Date(h.date ?? h);
                    return hd.toDateString() === d.toDateString();
                });
                if (isHoliday)
                    continue;
            }
            count++;
        }
        return count;
    }
    async buildApprovalFlow(leaveTypeId) {
        const workflow = await this.workflowModel.findOne({ leaveTypeId }).lean().exec();
        if (!workflow || !workflow.flow || workflow.flow.length === 0) {
            return [{ role: 'manager', status: 'pending' }];
        }
        return workflow.flow
            .sort((a, b) => a.order - b.order)
            .map((s) => ({ role: s.role, status: 'pending' }));
    }
    async createRequest(dto) {
        const from = new Date(dto.from);
        const to = new Date(dto.to);
        if (to < from)
            throw new common_1.BadRequestException('Invalid date range');
        const leaveType = await this.typeModel.findById(dto.leaveTypeId).lean().exec();
        if (!leaveType)
            throw new common_1.BadRequestException('Leave type not found');
        const policy = await this.policyModel.findOne({ leaveTypeId: leaveType._id }).lean().exec();
        const durationDays = await this.calculateNetDays(from, to);
        if (policy) {
            if (policy.minNoticeDays && policy.minNoticeDays > 0) {
                const now = new Date();
                const diffDays = Math.ceil((from.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                if (diffDays < policy.minNoticeDays) {
                    throw new common_1.BadRequestException(`Minimum notice required: ${policy.minNoticeDays} days`);
                }
            }
            if (policy.maxConsecutiveDays && durationDays > policy.maxConsecutiveDays) {
                throw new common_1.BadRequestException(`Max consecutive days exceeded: ${policy.maxConsecutiveDays}`);
            }
        }
        const calendar = await this.calendarModel.findOne({ year: from.getFullYear() }).lean().exec();
        if (calendar && calendar.blockedPeriods && calendar.blockedPeriods.length) {
            const overlap = calendar.blockedPeriods.some((b) => {
                const bf = new Date(b.from);
                const bt = new Date(b.to);
                return (from <= bt && to >= bf);
            });
            if (overlap)
                throw new common_1.BadRequestException('Requested dates fall into a blocked period');
        }
        const overlapping = await this.requestModel.findOne({
            'employeeId': dto['employeeId'] ? new mongoose_2.Types.ObjectId(dto['employeeId']) : { $exists: true },
            'leaveTypeId': new mongoose_2.Types.ObjectId(dto.leaveTypeId),
            $or: [
                { 'dates.from': { $lte: to }, 'dates.to': { $gte: from } },
            ],
            status: { $in: [leave_status_enum_1.LeaveStatus.PENDING, leave_status_enum_1.LeaveStatus.APPROVED] },
        }).lean().exec();
        if (overlapping)
            throw new common_1.BadRequestException('Overlapping leave request exists');
        if (dto['employeeId']) {
            const ent = await this.entitlementModel.findOne({
                employeeId: new mongoose_2.Types.ObjectId(dto['employeeId']),
                leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
            }).lean().exec();
            if (!ent)
                throw new common_1.BadRequestException('No entitlement found for employee & leave type');
            if (ent.remaining < durationDays) {
                throw new common_1.BadRequestException('Insufficient entitlement remaining for this leave');
            }
        }
        const approvalFlow = await this.buildApprovalFlow(new mongoose_2.Types.ObjectId(dto.leaveTypeId));
        const request = await this.requestModel.create({
            employeeId: dto['employeeId'] ? new mongoose_2.Types.ObjectId(dto['employeeId']) : null,
            leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
            dates: { from, to },
            durationDays,
            justification: dto.justification,
            attachmentId: dto.attachmentId ? new mongoose_2.Types.ObjectId(dto.attachmentId) : undefined,
            approvalFlow,
            status: leave_status_enum_1.LeaveStatus.PENDING,
            irregularPatternFlag: false,
        });
        return request;
    }
    async decideRequest(dto) {
        const { requestId, approverId, decision, comment } = dto;
        const req = await this.requestModel.findById(requestId);
        if (!req)
            throw new common_1.NotFoundException('Request not found');
        if (req.status !== leave_status_enum_1.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending requests can be decided');
        }
        const nextIndex = (req.approvalFlow || []).findIndex((s) => s.status === 'pending');
        if (nextIndex === -1) {
            throw new common_1.BadRequestException('No pending approval steps');
        }
        req.approvalFlow[nextIndex].status =
            decision === leave_status_enum_1.LeaveStatus.APPROVED ? 'approved' : 'rejected';
        req.approvalFlow[nextIndex].decidedBy = new mongoose_2.Types.ObjectId(approverId);
        req.approvalFlow[nextIndex].decidedAt = new Date();
        req.approvalFlow[nextIndex].comment = comment;
        if (decision === leave_status_enum_1.LeaveStatus.REJECTED) {
            req.status = leave_status_enum_1.LeaveStatus.REJECTED;
            await req.save();
            return { message: 'Request rejected', requestId };
        }
        const remainingPending = (req.approvalFlow || []).some((s) => s.status === 'pending');
        if (remainingPending) {
            await req.save();
            return { message: 'Step approved, forwarded to next approver', requestId };
        }
        const ent = await this.entitlementModel.findOne({
            employeeId: req.employeeId,
            leaveTypeId: req.leaveTypeId,
        });
        if (!ent) {
            throw new common_1.BadRequestException('No entitlement found to deduct from for this employee');
        }
        ent.remaining = Math.max(0, (ent.remaining ?? 0) - (req.durationDays ?? 0));
        ent.taken = (ent.taken ?? 0) + (req.durationDays ?? 0);
        ent.auditLogs = ent.auditLogs || [];
        ent.auditLogs.push({
            action: 'Deduct on Approval',
            type: adjustment_type_enum_1.AdjustmentType.DEDUCT,
            amount: req.durationDays,
            by: approverId,
            reason: `Approved request ${req._id}`,
            timestamp: new Date(),
        });
        await ent.save();
        req.status = leave_status_enum_1.LeaveStatus.APPROVED;
        await req.save();
        return { message: 'Request fully approved and entitlement deducted', requestId };
    }
    async getRequestsForEmployee(employeeId, status) {
        const filter = {
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        };
        if (status)
            filter.status = status;
        return this.requestModel.find(filter).populate('leaveTypeId').lean().exec();
    }
    async cancelRequest(requestId) {
        const req = await this.requestModel.findById(requestId);
        if (!req) {
            throw new common_1.BadRequestException('Leave request not found');
        }
        if (req.status === leave_status_enum_1.LeaveStatus.APPROVED) {
            throw new common_1.BadRequestException('Cannot cancel an approved request (balance already deducted)');
        }
        if (req.status === leave_status_enum_1.LeaveStatus.REJECTED) {
            throw new common_1.BadRequestException('Request already rejected');
        }
        if (req.status === leave_status_enum_1.LeaveStatus.CANCELLED) {
            throw new common_1.BadRequestException('Request already cancelled');
        }
        await this.entitlementModel.updateOne({
            employeeId: req.employeeId,
            leaveTypeId: req.leaveTypeId,
        }, {
            $inc: { pending: -req.durationDays },
        });
        req.status = leave_status_enum_1.LeaveStatus.CANCELLED;
        await req.save();
        return {
            message: 'Leave request cancelled successfully',
            requestId,
        };
    }
    async getRequestById(id) {
        return this.requestModel.findById(id).populate('leaveTypeId').lean().exec();
    }
};
exports.LeaveRequestService = LeaveRequestService;
exports.LeaveRequestService = LeaveRequestService = LeaveRequestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_request_schema_1.LeaveRequest.name)),
    __param(1, (0, mongoose_1.InjectModel)(approval_workflow_schema_1.ApprovalWorkflow.name)),
    __param(2, (0, mongoose_1.InjectModel)(leave_entitlement_schema_1.LeaveEntitlement.name)),
    __param(3, (0, mongoose_1.InjectModel)(leave_policy_schema_1.LeavePolicy.name)),
    __param(4, (0, mongoose_1.InjectModel)(calendar_schema_1.Calendar.name)),
    __param(5, (0, mongoose_1.InjectModel)(leave_type_schema_1.LeaveType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LeaveRequestService);
//# sourceMappingURL=leave-request.service.js.map