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
exports.TimeExceptionService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const time_exception_schema_1 = require("../models/time-exception.schema");
let TimeExceptionService = class TimeExceptionService {
    timeExceptionModel;
    constructor(timeExceptionModel) {
        this.timeExceptionModel = timeExceptionModel;
    }
    async listAll() {
        return this.timeExceptionModel.find();
    }
    async update(id, dto) {
        const existing = await this.timeExceptionModel.findById(id);
        if (!existing) {
            throw new common_3.NotFoundException('Time Exception not found');
        }
        const updated = await this.timeExceptionModel.findByIdAndUpdate(id, dto, { new: true });
        return {
            success: true,
            message: 'Time Exception updated successfully',
            data: updated,
        };
    }
    async delete(id) {
        const deleted = await this.timeExceptionModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new common_3.NotFoundException('Time Exception not found');
        }
        return {
            success: true,
            message: 'Time Exception deleted',
        };
    }
    async approve(id, approvedBy) {
        const exception = await this.timeExceptionModel.findById(id);
        if (!exception) {
            throw new common_3.NotFoundException('Time Exception not found');
        }
        if (exception.status !== 'PENDING') {
            throw new common_2.BadRequestException('Only PENDING exceptions can be approved.');
        }
        if (exception.employeeId.toString() === approvedBy) {
            throw new common_2.BadRequestException('You cannot approve your own exception.');
        }
        const updated = await this.timeExceptionModel.findByIdAndUpdate(id, {
            status: 'APPROVED',
            approvedBy,
            approvedAt: new Date(),
        }, { new: true });
        return {
            success: true,
            message: 'Time Exception approved successfully',
            data: updated,
        };
    }
    async findById(id) {
        return this.timeExceptionModel.findById(id);
    }
    async reject(id, rejectedBy, reason) {
        const updated = await this.timeExceptionModel.findByIdAndUpdate(id, {
            status: 'REJECTED',
            rejectedBy,
            rejectedAt: new Date(),
            rejectionReason: reason
        }, { new: true });
        if (!updated)
            throw new common_2.BadRequestException('Time Exception not found');
        return {
            success: true,
            message: 'Time Exception rejected successfully',
            data: updated,
        };
    }
    async autoEscalatePending() {
        try {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const timestamp = Math.floor(threeDaysAgo.getTime() / 1000);
            const hexSeconds = timestamp.toString(16);
            const objectIdLimit = new mongoose_3.Types.ObjectId(hexSeconds.padStart(8, '0') + "0000000000000000");
            const updated = await this.timeExceptionModel.updateMany({
                status: 'PENDING',
                _id: { $lte: objectIdLimit },
            }, { $set: { status: 'ESCALATED' } });
            return {
                success: true,
                message: 'Pending Time Exceptions auto-escalated',
                count: updated.modifiedCount,
            };
        }
        catch (error) {
            console.error("AUTO ESCALATE ERROR:", error);
            throw new common_1.InternalServerErrorException("Failed to auto-escalate");
        }
    }
    async create(dto) {
        const created = new this.timeExceptionModel(dto);
        return await created.save();
    }
    async forcePending(id) {
        return this.timeExceptionModel.findByIdAndUpdate(id, { status: 'PENDING' }, { new: true });
    }
    async escalatePendingExceptions() {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        try {
            const updated = await this.timeExceptionModel.updateMany({
                status: 'PENDING',
                createdAt: { $lt: threeDaysAgo },
            }, {
                $set: { status: 'ESCALATED' },
            });
            return {
                matched: updated.matchedCount,
                modified: updated.modifiedCount,
            };
        }
        catch (err) {
            console.error('ESCALATION ERROR:', err);
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async escalate(id) {
        const exception = await this.timeExceptionModel.findById(id);
        if (!exception) {
            throw new common_3.NotFoundException('Time Exception not found');
        }
        if (exception.status === 'APPROVED') {
            throw new common_2.BadRequestException('Approved exceptions cannot be escalated');
        }
        const updated = await this.timeExceptionModel.findByIdAndUpdate(id, { status: 'ESCALATED' }, { new: true });
        return {
            success: true,
            message: 'Time Exception escalated successfully',
            data: updated,
        };
    }
};
exports.TimeExceptionService = TimeExceptionService;
exports.TimeExceptionService = TimeExceptionService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TimeExceptionService);
//# sourceMappingURL=time-exception.service.js.map