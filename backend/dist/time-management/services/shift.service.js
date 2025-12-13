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
exports.ShiftService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const shift_schema_1 = require("../models/shift.schema");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
const shift_type_schema_1 = require("../models/shift-type.schema");
let ShiftService = class ShiftService {
    shiftModel;
    shiftTypeModel;
    constructor(shiftModel, shiftTypeModel) {
        this.shiftModel = shiftModel;
        this.shiftTypeModel = shiftTypeModel;
    }
    async createShift(shiftData) {
        if (!shiftData.name || !shiftData.startTime || !shiftData.endTime || !shiftData.shiftType) {
            throw new common_1.BadRequestException('All data must be provided!');
        }
        const shiftType = await this.shiftTypeModel.findById(shiftData.shiftType);
        if (!shiftType)
            throw new common_1.NotFoundException('Shift Type not found!');
        const shift = await this.shiftModel.create({
            name: shiftData.name,
            startTime: shiftData.startTime,
            endTime: shiftData.endTime,
            shiftType: shiftData.shiftType,
            punchPolicy: shiftData.punchPolicy,
            graceInMinutes: shiftData.graceInMinutes,
            graceOutMinutes: shiftData.graceOutMinutes,
            active: shiftData.active,
            requiresApprovalForOvertime: shiftData.requiresApprovalForOvertime
        });
        return {
            success: true,
            message: "Shift Created Successfully!",
            data: shift
        };
    }
    async getAllShifts() {
        const shifts = await this.shiftModel.find();
        if (!shifts)
            throw new common_1.NotFoundException("No shifts found!");
        return {
            success: true,
            message: "Shifts found successfully!",
            data: shifts
        };
    }
    async getShiftById(shiftId) {
        const shift = await this.shiftModel.findById(shiftId);
        if (!shift) {
            throw new common_1.NotFoundException('No shift found!');
        }
        return {
            success: true,
            message: "Shift found by ID successfully!",
            data: shift
        };
    }
    async deactivateShift(shiftId) {
        const shift = await this.shiftModel.findByIdAndUpdate(shiftId, { active: false }, { new: true });
        if (!shift)
            throw new common_1.NotFoundException('Shift not found!');
        return {
            success: true,
            message: "Shift deactivated successfully",
            data: shift
        };
    }
    async activateShit(shiftId) {
        const shift = await this.shiftModel.findByIdAndUpdate(shiftId, { active: true }, { new: true });
        if (!shift)
            throw new common_1.NotFoundException("Shift not found!");
        return {
            success: true,
            message: "Shift activated successfully!",
            data: shift
        };
    }
    async deleteShift(shiftId) {
        const shift = await this.shiftModel.findByIdAndDelete(shiftId);
        if (!shift)
            throw new common_1.NotFoundException('Shift not found!');
        return {
            success: true,
            message: "Shift deleted succesfully!",
            data: shift
        };
    }
};
exports.ShiftService = ShiftService;
exports.ShiftService = ShiftService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_type_schema_1.ShiftType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ShiftService);
//# sourceMappingURL=shift.service.js.map