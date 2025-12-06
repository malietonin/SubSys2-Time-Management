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
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_category_schema_1 = require("./models/leave-category.schema");
const leave_type_schema_1 = require("./models/leave-type.schema");
const leave_policy_schema_1 = require("./models/leave-policy.schema");
const calendar_schema_1 = require("./models/calendar.schema");
const approval_workflow_schema_1 = require("./models/approval-workflow.schema");
const leave_entitlement_schema_1 = require("./models/leave-entitlement.schema");
const leave_request_schema_1 = require("./models/leave-request.schema");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const leave_status_enum_1 = require("./enums/leave-status.enum");
const accrual_method_enum_1 = require("./enums/accrual-method.enum");
let LeavesService = class LeavesService {
    categoryModel;
    typeModel;
    policyModel;
    calendarModel;
    workflowModel;
    entitlementModel;
    paycodeModel;
    requestModel;
    employeeModel;
    constructor(categoryModel, typeModel, policyModel, calendarModel, workflowModel, entitlementModel, paycodeModel, requestModel, employeeModel) {
        this.categoryModel = categoryModel;
        this.typeModel = typeModel;
        this.policyModel = policyModel;
        this.calendarModel = calendarModel;
        this.workflowModel = workflowModel;
        this.entitlementModel = entitlementModel;
        this.paycodeModel = paycodeModel;
        this.requestModel = requestModel;
        this.employeeModel = employeeModel;
    }
    createCategory(dto) {
        return this.categoryModel.create(dto);
    }
    getAllCategories() {
        return this.categoryModel.find().exec();
    }
    updateCategory(id, dto) {
        return this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async deleteCategory(id) {
        const linkedType = await this.typeModel.exists({ categoryId: id });
        if (linkedType) {
            throw new common_1.BadRequestException('Cannot delete category with linked leave types');
        }
        return this.categoryModel.findByIdAndDelete(id);
    }
    async createLeaveType(dto) {
        const exists = await this.typeModel.findOne({ code: dto.code });
        if (exists)
            throw new common_1.BadRequestException('Leave type code already exists');
        return this.typeModel.create(dto);
    }
    getAllLeaveTypes() {
        return this.typeModel.find().populate('categoryId').exec();
    }
    updateLeaveType(id, dto) {
        return this.typeModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async deleteLeaveType(id) {
        const linkedPolicy = await this.policyModel.exists({ leaveTypeId: id });
        if (linkedPolicy)
            throw new common_1.BadRequestException('Cannot delete leave type with an active policy');
        return this.typeModel.findByIdAndDelete(id);
    }
    async createPolicy(dto) {
        const exists = await this.policyModel.findOne({ leaveTypeId: dto.leaveTypeId });
        if (exists)
            throw new common_1.BadRequestException('Policy already exists for this leave type');
        return this.policyModel.create(dto);
    }
    getAllPolicies() {
        return this.policyModel.find().populate('leaveTypeId');
    }
    updatePolicy(id, dto) {
        return this.policyModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async deletePolicy(id) {
        const used = await this.entitlementModel.exists({ policyId: id });
        if (used)
            throw new common_1.BadRequestException('Cannot delete policy linked to entitlements');
        return this.policyModel.findByIdAndDelete(id);
    }
    createCalendar(dto) {
        return this.calendarModel.findOneAndUpdate({ year: dto.year }, dto, { upsert: true, new: true });
    }
    getCalendarByYear(year) {
        return this.calendarModel.findOne({ year });
    }
    async addHoliday(year, dto) {
        const calendar = await this.calendarModel.findOne({ year });
        if (!calendar)
            throw new common_1.NotFoundException('Calendar not found');
        const holidayObjId = new mongoose_2.Types.ObjectId(dto.holidayId);
        if (calendar.holidays.some(h => h.equals(holidayObjId)))
            throw new common_1.BadRequestException('Holiday already added');
        calendar.holidays.push(holidayObjId);
        return calendar.save();
    }
    async removeHoliday(year, dto) {
        const calendar = await this.calendarModel.findOne({ year });
        if (!calendar)
            throw new common_1.NotFoundException('Calendar not found');
        calendar.holidays = calendar.holidays.filter(h => h.toString() !== dto.holidayId);
        return calendar.save();
    }
    async addBlockedPeriod(year, dto) {
        const calendar = await this.calendarModel.findOne({ year });
        if (!calendar)
            throw new common_1.NotFoundException('Calendar not found');
        const overlap = calendar.blockedPeriods.some(b => (dto.from >= b.from && dto.from <= b.to) ||
            (dto.to >= b.from && dto.to <= b.to));
        if (overlap)
            throw new common_1.BadRequestException('Blocked period overlaps existing one');
        calendar.blockedPeriods.push(dto);
        return calendar.save();
    }
    async removeBlockedPeriod(year, index) {
        const calendar = await this.calendarModel.findOne({ year });
        if (!calendar)
            throw new common_1.NotFoundException('Calendar not found');
        calendar.blockedPeriods.splice(index, 1);
        return calendar.save();
    }
    async calculateNetLeaveDays(start, end, year) {
        const calendar = await this.calendarModel.findOne({ year }).populate('holidays', 'date');
        if (!calendar)
            throw new common_1.NotFoundException('Calendar not found');
        const totalDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
        const weekends = Array.from({ length: totalDays }).filter((_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            return d.getDay() === 5 || d.getDay() === 6;
        }).length;
        const holidayDays = calendar.holidays
            .filter(h => new Date(h.date) >= start && new Date(h.date) <= end).length;
        return totalDays - weekends - holidayDays;
    }
    async createEntitlementForEmployee(employee) {
        const leaveTypes = await this.typeModel.find().lean();
        const policies = await this.policyModel
            .find({ leaveTypeId: { $in: leaveTypes.map(t => t._id) } })
            .lean();
        const policyMap = new Map();
        policies.forEach(p => policyMap.set(p.leaveTypeId.toString(), p));
        const entitlements = leaveTypes.map(type => {
            const policy = policyMap.get(type._id.toString());
            let yearlyEntitlement = 0;
            if (employee.grade === 'A')
                yearlyEntitlement = 30;
            else if (employee.tenure >= 10)
                yearlyEntitlement = 28;
            else if (employee.tenure >= 5)
                yearlyEntitlement = 24;
            else
                yearlyEntitlement = 21;
            if (employee.contractType === 'temporary')
                yearlyEntitlement = Math.min(yearlyEntitlement, 15);
            if (policy)
                yearlyEntitlement = policy.yearlyRate ?? yearlyEntitlement;
            return {
                employeeId: new mongoose_2.Types.ObjectId(employee._id),
                leaveTypeId: type._id,
                yearlyEntitlement,
                accruedActual: 0,
                accruedRounded: 0,
                carryForward: 0,
                taken: 0,
                pending: 0,
                remaining: yearlyEntitlement,
                lastAccrualDate: null,
                nextResetDate: null,
            };
        });
        return this.entitlementModel.insertMany(entitlements);
    }
    async accrueMonthlyEntitlements() {
        const entitlements = await this.entitlementModel.find().populate('employeeId');
        for (const ent of entitlements) {
            const policy = await this.policyModel.findOne({ leaveTypeId: ent.leaveTypeId });
            if (!policy)
                continue;
            const employeeStatus = ent.employeeId?.status?.toLowerCase();
            if (employeeStatus === 'suspended' || employeeStatus === 'unpaid')
                continue;
            if (policy.accrualMethod === accrual_method_enum_1.AccrualMethod.MONTHLY) {
                const increment = (policy.yearlyRate ?? 0) / 12;
                ent.accruedActual += increment;
                ent.remaining += increment;
                ent.lastAccrualDate = new Date();
                await ent.save();
            }
        }
        return { message: 'Accrual cycle complete' };
    }
    async resetYearlyBalances() {
        const entitlements = await this.entitlementModel.find();
        for (const ent of entitlements) {
            ent.carryForward = Math.min(ent.remaining, 5);
            ent.accruedActual = 0;
            ent.remaining = ent.yearlyEntitlement + ent.carryForward;
            ent.nextResetDate = new Date(new Date().getFullYear() + 1, 0, 1);
            await ent.save();
        }
        return { message: 'Yearly reset completed' };
    }
    async createApprovalWorkflow(dto) {
        const roles = dto.flow.map(s => s.role);
        const duplicates = roles.filter((r, i) => roles.indexOf(r) !== i);
        if (duplicates.length)
            throw new common_1.BadRequestException('Duplicate roles not allowed in workflow');
        return this.workflowModel.create(dto);
    }
    getApprovalWorkflow(leaveTypeId) {
        return this.workflowModel.findOne({ leaveTypeId });
    }
    updateApprovalWorkflow(leaveTypeId, dto) {
        return this.workflowModel.findOneAndUpdate({ leaveTypeId }, dto, { new: true });
    }
    createPaycodeMapping(dto) {
        return this.paycodeModel.create({
            leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
            payrollCode: dto.payrollCode,
            description: dto.description,
        });
    }
    getAllPaycodeMappings() {
        return this.paycodeModel.find().populate('leaveTypeId');
    }
    getPaycodeForLeaveType(leaveTypeId) {
        return this.paycodeModel.findOne({ leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId) });
    }
    updatePaycodeMapping(id, dto) {
        return this.paycodeModel.findByIdAndUpdate(id, dto, { new: true });
    }
    deletePaycodeMapping(id) {
        return this.paycodeModel.findByIdAndDelete(id);
    }
    async createLeaveRequest(employeeId, dto) {
        const leaveType = await this.typeModel.findById(dto.leaveTypeId);
        if (!leaveType)
            throw new common_1.NotFoundException('Leave type not found');
        if (leaveType.requiresAttachment && !dto.attachmentId)
            throw new common_1.BadRequestException('Attachment is required');
        const from = new Date(dto.from);
        const to = new Date(dto.to);
        if (to < from)
            throw new common_1.BadRequestException('Invalid date range');
        const durationDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24)) + 1;
        const policy = await this.policyModel.findOne({ leaveTypeId: leaveType._id });
        if (policy?.maxConsecutiveDays && durationDays > policy.maxConsecutiveDays)
            throw new common_1.BadRequestException(`Exceeds maximum consecutive days`);
        const today = new Date();
        if (to < today && policy?.minNoticeDays) {
            const diff = Math.ceil((today.getTime() - to.getTime()) / 86400000);
            if (diff > policy.minNoticeDays)
                throw new common_1.BadRequestException('Grace period exceeded');
        }
        const entitlement = await this.entitlementModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: leaveType._id,
        });
        if (!entitlement)
            throw new common_1.NotFoundException('No entitlement found for employee');
        const remaining = entitlement.remaining;
        if (durationDays > remaining) {
            throw new common_1.BadRequestException(`Requested ${durationDays} days but only ${remaining} remaining`);
        }
        const employeeProfile = await this.employeeModel.findById(employeeId);
        if (!employeeProfile)
            throw new common_1.NotFoundException('Employee not found');
        const departmentId = employeeProfile.primaryDepartmentId;
        if (departmentId) {
            const teamMembers = await this.employeeModel.find({
                primaryDepartmentId: departmentId,
            }).select('_id');
            const teamIds = teamMembers.map(e => e._id.toString());
            const overlaps = await this.requestModel.countDocuments({
                employeeId: { $in: teamIds },
                status: leave_status_enum_1.LeaveStatus.APPROVED,
                $or: [
                    { 'dates.from': { $lte: to }, 'dates.to': { $gte: from } },
                ],
            });
            const maxAllowed = Math.ceil(teamIds.length * 0.3);
            if (overlaps >= maxAllowed)
                throw new common_1.BadRequestException('Team scheduling conflict');
        }
        const overlapReq = await this.requestModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            status: leave_status_enum_1.LeaveStatus.APPROVED,
            $or: [
                { 'dates.from': { $lte: to }, 'dates.to': { $gte: from } },
            ],
        });
        if (overlapReq)
            throw new common_1.BadRequestException('Overlaps with approved leave');
        const workflow = await this.workflowModel.findOne({ leaveTypeId: leaveType._id });
        const approvalFlow = workflow
            ? workflow.flow.map(s => ({ role: s.role, status: 'pending' }))
            : [];
        return this.requestModel.create({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            leaveTypeId: leaveType._id,
            dates: { from, to },
            durationDays,
            justification: dto.justification,
            attachmentId: dto.attachmentId ? new mongoose_2.Types.ObjectId(dto.attachmentId) : undefined,
            approvalFlow,
            status: leave_status_enum_1.LeaveStatus.PENDING,
            irregularPatternFlag: false,
        });
    }
    getAllLeaveRequests() {
        return this.requestModel.find().populate('leaveTypeId attachmentId');
    }
    getLeaveRequest(id) {
        return this.requestModel.findById(id)
            .populate('leaveTypeId attachmentId');
    }
    async updateLeaveRequest(id, dto) {
        const leave = await this.requestModel.findById(id);
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        if (dto.justification !== undefined)
            leave.justification = dto.justification;
        if (dto.status !== undefined) {
            leave.status = dto.status;
            const pendingStep = leave.approvalFlow.find(s => s.status === 'pending');
            if (pendingStep) {
                pendingStep.status = dto.status;
                pendingStep.decidedBy = dto.decidedBy ? new mongoose_2.Types.ObjectId(dto.decidedBy) : undefined;
                pendingStep.decidedAt = new Date();
            }
            if (dto.status === leave_status_enum_1.LeaveStatus.APPROVED) {
                const entitlement = await this.entitlementModel.findOne({
                    employeeId: leave.employeeId,
                    leaveTypeId: leave.leaveTypeId,
                });
                if (entitlement) {
                    entitlement.taken += leave.durationDays ?? 0;
                    entitlement.remaining -= leave.durationDays ?? 0;
                    await entitlement.save();
                }
            }
        }
        return leave.save();
    }
    async routeToManager(leaveRequestId, delegateToId) {
        const leave = await this.requestModel.findById(leaveRequestId);
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        const employee = await this.employeeModel.findById(leave.employeeId);
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        const manager = await this.employeeModel.findOne({
            primaryDepartmentId: employee.primaryDepartmentId,
            systemRole: 'Manager',
        });
        if (!manager)
            throw new common_1.NotFoundException('Manager not assigned');
        const step = {
            role: 'Manager',
            assignedTo: manager._id,
            status: 'pending',
        };
        if (delegateToId) {
            const delegate = await this.employeeModel.findById(delegateToId);
            if (!delegate)
                throw new common_1.NotFoundException('Delegate not found');
            step.delegateTo = delegate._id;
        }
        leave.approvalFlow.push(step);
        await leave.save();
        return leave;
    }
    async managerDecision(leaveRequestId, managerId, decision) {
        const leave = await this.requestModel.findById(leaveRequestId);
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        const approvalFlow = leave.approvalFlow;
        const step = approvalFlow.find(s => s.role === 'Manager' &&
            s.status === 'pending' &&
            (s.assignedTo?.toString() === managerId ||
                s.delegateTo?.toString() === managerId));
        if (!step)
            throw new common_1.ForbiddenException('No pending managerial action');
        step.status = decision;
        step.decidedBy = new mongoose_2.Types.ObjectId(managerId);
        step.decidedAt = new Date();
        step.escalationAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
        await leave.save();
        return leave;
    }
    async hrComplianceReview(leaveRequestId, hrId, action, overrideManager = false) {
        const leave = await this.requestModel.findById(leaveRequestId);
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        const approvalFlow = leave.approvalFlow;
        const managerStep = approvalFlow.find(s => s.role === 'Manager');
        if (!managerStep || (managerStep.status !== 'approved' && !overrideManager))
            throw new common_1.BadRequestException('Manager approval required first');
        const entitlement = await this.entitlementModel.findOne({
            employeeId: leave.employeeId,
            leaveTypeId: leave.leaveTypeId,
        });
        if (!entitlement)
            throw new common_1.NotFoundException('Entitlement not found');
        if (entitlement.taken + (leave.durationDays ?? 0) > entitlement.yearlyEntitlement)
            throw new common_1.BadRequestException('Exceeds yearly limit');
        approvalFlow.push({
            role: 'HR',
            assignedTo: new mongoose_2.Types.ObjectId(hrId),
            status: action,
            decidedAt: new Date(),
            decidedBy: new mongoose_2.Types.ObjectId(hrId),
            overrideManager,
        });
        leave.status = action === 'approved'
            ? leave_status_enum_1.LeaveStatus.APPROVED
            : leave_status_enum_1.LeaveStatus.REJECTED;
        await leave.save();
        return leave;
    }
    async finalizeLeaveRequest(leaveRequestId) {
        const leave = await this.requestModel.findById(leaveRequestId);
        if (!leave)
            throw new common_1.NotFoundException('Request not found');
        if (leave.status !== leave_status_enum_1.LeaveStatus.APPROVED)
            throw new common_1.BadRequestException('Not approved yet');
        const entitlement = await this.entitlementModel.findOne({
            employeeId: leave.employeeId,
            leaveTypeId: leave.leaveTypeId,
        });
        if (entitlement) {
            entitlement.taken += leave.durationDays ?? 0;
            entitlement.remaining -= leave.durationDays ?? 0;
            await entitlement.save();
        }
        console.log(`Notify employee ${leave.employeeId}`);
        console.log(`Notify manager about approval`);
        console.log(`Block attendance for ${leave.employeeId}`);
        console.log(`Adjust payroll for paid/unpaid days`);
        const unapprovedOld = await this.requestModel.find({
            employeeId: leave.employeeId,
            status: leave_status_enum_1.LeaveStatus.PENDING,
            'dates.to': { $lt: new Date() },
        });
        for (const oldReq of unapprovedOld) {
            const ent = await this.entitlementModel.findOne({
                employeeId: oldReq.employeeId,
                leaveTypeId: oldReq.leaveTypeId,
            });
            if (ent) {
                const deduction = oldReq.durationDays ?? 0;
                ent.remaining -= deduction;
                await ent.save();
                console.log(`Retroactive deduction of ${deduction} days`);
            }
        }
        return leave;
    }
    async autoEscalateManagerApprovals() {
        const now = new Date();
        const leavesToEscalate = await this.requestModel.find({
            'approvalFlow.role': 'Manager',
            'approvalFlow.status': 'pending',
            'approvalFlow.escalationAt': { $lte: now },
        });
        for (const leave of leavesToEscalate) {
            const approvalFlow = leave.approvalFlow;
            let updated = false;
            approvalFlow.forEach(step => {
                if (step.role === 'Manager' &&
                    step.status === 'pending' &&
                    step.escalationAt &&
                    step.escalationAt <= now) {
                    step.role = 'HR';
                    step.status = 'pending';
                    step.assignedTo = undefined;
                    updated = true;
                }
            });
            if (updated)
                await leave.save();
        }
        return leavesToEscalate.length;
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_category_schema_1.LeaveCategory.name)),
    __param(1, (0, mongoose_1.InjectModel)(leave_type_schema_1.LeaveType.name)),
    __param(2, (0, mongoose_1.InjectModel)(leave_policy_schema_1.LeavePolicy.name)),
    __param(3, (0, mongoose_1.InjectModel)(calendar_schema_1.Calendar.name)),
    __param(4, (0, mongoose_1.InjectModel)(approval_workflow_schema_1.ApprovalWorkflow.name)),
    __param(5, (0, mongoose_1.InjectModel)(leave_entitlement_schema_1.LeaveEntitlement.name)),
    __param(6, (0, mongoose_1.InjectModel)('LeavePaycodeMapping')),
    __param(7, (0, mongoose_1.InjectModel)(leave_request_schema_1.LeaveRequest.name)),
    __param(8, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map