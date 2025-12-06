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
exports.ScheduleRuleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_rule_schema_1 = require("../models/schedule-rule.schema");
let ScheduleRuleService = class ScheduleRuleService {
    scheduleRuleModel;
    constructor(scheduleRuleModel) {
        this.scheduleRuleModel = scheduleRuleModel;
    }
    async createScheduleRule(dto) {
        if (!dto.name) {
            throw new common_1.BadRequestException("Name cannot be empty");
        }
        if (!dto.pattern) {
            throw new common_1.BadRequestException("Pattern cannot be empty");
        }
        const createdRule = await this.scheduleRuleModel.create(dto);
        return createdRule;
    }
    async getAllScheduleRules() {
        const rules = await this.scheduleRuleModel.find();
        if (!rules || rules.length === 0) {
            throw new common_1.NotFoundException("No schedule rules found");
        }
        return rules;
    }
    async getScheduleRuleById(id) {
        const rule = await this.scheduleRuleModel.findById(id);
        if (!rule) {
            throw new common_1.NotFoundException(`Schedule rule with ID ${id} not found`);
        }
        return rule;
    }
    async updateScheduleRule(id, dto) {
        const updated = await this.scheduleRuleModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated) {
            throw new common_1.NotFoundException(`Schedule rule with ID ${id} not found`);
        }
        return updated;
    }
    async deleteScheduleRule(id) {
        const deleted = await this.scheduleRuleModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Schedule rule with ID ${id} not found`);
        }
        return {
            success: true,
            message: "Schedule rule deleted successfully",
            data: deleted
        };
    }
};
exports.ScheduleRuleService = ScheduleRuleService;
exports.ScheduleRuleService = ScheduleRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedule_rule_schema_1.ScheduleRule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ScheduleRuleService);
//# sourceMappingURL=schedule-rule.service.js.map