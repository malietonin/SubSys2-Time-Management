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
exports.ShiftTypeService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shift_type_schema_1 = require("../models/shift-type.schema");
const common_1 = require("@nestjs/common");
let ShiftTypeService = class ShiftTypeService {
    shiftTypeModel;
    constructor(shiftTypeModel) {
        this.shiftTypeModel = shiftTypeModel;
    }
    async createShiftType(shiftTypeData) {
        if (!shiftTypeData.name)
            throw new common_1.BadRequestException("Name must be provided!");
        if (!shiftTypeData.active)
            throw new common_1.BadRequestException("Activity must be provided!");
        const shiftType = await this.shiftTypeModel.create(shiftTypeData);
        return {
            success: true,
            message: "Shift Type Created Successfully!",
            data: shiftType
        };
    }
    async getAllShiftTypes() {
        const shiftTypes = await this.shiftTypeModel.find();
        if (!shiftTypes)
            throw new common_1.NotFoundException('No Shift Types Found!');
        return {
            success: true,
            message: "Shift Types Found Successfully!",
            data: shiftTypes
        };
    }
    async getShiftTypeById(shiftTypeId) {
        const shiftType = await this.shiftTypeModel.findById(shiftTypeId);
        if (!shiftType)
            throw new common_1.NotFoundException("No Shift Types Found!");
        return {
            success: true,
            message: "Shift Type Found Successfully!",
            data: shiftType
        };
    }
    async deleteShiftType(shiftTypeId) {
        const deletedShiftType = await this.shiftTypeModel.findByIdAndDelete(shiftTypeId);
        return {
            success: true,
            message: "Shift Type Deleted Successfully!",
            data: deletedShiftType
        };
    }
};
exports.ShiftTypeService = ShiftTypeService;
exports.ShiftTypeService = ShiftTypeService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(shift_type_schema_1.ShiftType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ShiftTypeService);
//# sourceMappingURL=shift-type.service.js.map