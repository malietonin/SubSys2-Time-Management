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
exports.AttendanceCorrectionRequestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_correction_request_schema_1 = require("../models/attendance-correction-request.schema");
const index_1 = require("../models/enums/index");
let AttendanceCorrectionRequestService = class AttendanceCorrectionRequestService {
    requestModel;
    constructor(requestModel) {
        this.requestModel = requestModel;
    }
    async submitCorrectionRequest(dto) {
        const request = await this.requestModel.create({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            attendanceRecord: new mongoose_2.Types.ObjectId(dto.attendanceRecordId),
            reason: dto.reason,
            status: index_1.CorrectionRequestStatus.SUBMITTED,
        });
        return {
            success: true,
            message: 'Attendance correction request submitted successfully!',
            data: request,
        };
    }
    async updateCorrectionRequest(id, dto) {
        const request = await this.requestModel.findById(id);
        if (!request)
            throw new common_1.NotFoundException('Correction request not found!');
        if (request.status !== index_1.CorrectionRequestStatus.SUBMITTED && request.status !== index_1.CorrectionRequestStatus.IN_REVIEW) {
            throw new common_1.BadRequestException('Only pending requests can be updated.');
        }
        if (dto.reason !== undefined)
            request.reason = dto.reason;
        await request.save();
        return {
            success: true,
            message: 'Correction request updated successfully!',
            data: request,
        };
    }
    async approveCorrectionRequest(id) {
        const request = await this.requestModel.findById(id);
        if (!request)
            throw new common_1.NotFoundException('Correction request not found!');
        if (request.status !== index_1.CorrectionRequestStatus.SUBMITTED && request.status !== index_1.CorrectionRequestStatus.IN_REVIEW) {
            throw new common_1.BadRequestException('Only pending requests can be approved.');
        }
        request.status = index_1.CorrectionRequestStatus.APPROVED;
        await request.save();
        return {
            success: true,
            message: 'Correction request approved successfully!',
            data: request,
        };
    }
    async rejectCorrectionRequest(id, reason) {
        const request = await this.requestModel.findById(id);
        if (!request)
            throw new common_1.NotFoundException('Correction request not found!');
        if (request.status !== index_1.CorrectionRequestStatus.SUBMITTED && request.status !== index_1.CorrectionRequestStatus.IN_REVIEW) {
            throw new common_1.BadRequestException('Only pending requests can be rejected.');
        }
        request.status = index_1.CorrectionRequestStatus.REJECTED;
        request.reason = reason;
        await request.save();
        return {
            success: true,
            message: 'Correction request rejected successfully!',
            data: request,
        };
    }
    async listEmployeeCorrectionRequests(employeeId) {
        return await this.requestModel
            .find({ employeeId })
            .populate('attendanceRecord')
            .exec();
    }
    async autoEscalatePendingCorrections() {
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() - 48);
        const updated = await this.requestModel.updateMany({
            status: index_1.CorrectionRequestStatus.IN_REVIEW,
            createdAt: { $lt: cutoff }
        }, {
            $set: { status: index_1.CorrectionRequestStatus.ESCALATED }
        });
        return {
            escalatedCount: updated.modifiedCount
        };
    }
};
exports.AttendanceCorrectionRequestService = AttendanceCorrectionRequestService;
exports.AttendanceCorrectionRequestService = AttendanceCorrectionRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_correction_request_schema_1.AttendanceCorrectionRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendanceCorrectionRequestService);
//# sourceMappingURL=attendance-correction-request.service.js.map