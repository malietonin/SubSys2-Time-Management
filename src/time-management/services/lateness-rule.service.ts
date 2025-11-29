 import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { LatenessRule, LatenessRuleDocument } from '../models/lateness-rule.schema';
import { LatenessRuleCreateDto } from '../dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from '../dtos/lateness-rule-update.dto';

@Injectable()
export class LatenessRuleService {
    constructor(
        @InjectModel(LatenessRule.name)
        private readonly latenessRuleModel: Model<LatenessRuleDocument>,

    ) {}

    // CREATE
    async createLatenessRule(dto: LatenessRuleCreateDto) {
        const created = await this.latenessRuleModel.create(dto);

        return {
            success: true,
            message: 'Lateness rule created successfully',
            data: created,
        };
    }

    // LIST
    async listLatenessRules() {
        return this.latenessRuleModel.find();
    }

    // UPDATE
    async updateLatenessRule(id: string, dto: LatenessRuleUpdateDto) {
        const updated = await this.latenessRuleModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );

        if (!updated) {
            throw new NotFoundException('Lateness rule not found');
        }

        return {
            success: true,
            message: 'Lateness rule updated successfully',
            data: updated,
        };
    }

    // DELETE
    async deleteLatenessRule(id: string) {
        const deleted = await this.latenessRuleModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException('Lateness rule not found');
        }

        return {
            success: true,
            message: 'Lateness rule deleted successfully',
        };
    }
    async findById(id: string) {
     return this.latenessRuleModel.findById(id);
}

    
    async applyLatenessPenalty(actualMinutesLate: number, ruleId: string) {
        const rule = await this.latenessRuleModel.findById(ruleId);

        if (!rule) {
            throw new NotFoundException('Lateness rule not found');
        }
 
        const effectiveMinutes =
            actualMinutesLate - rule.gracePeriodMinutes;

        const finalMinutes = Math.max(effectiveMinutes, 0);

        const penalty = finalMinutes * rule.deductionForEachMinute;

        return {
            success: true,
            ruleUsed: rule.name,
            effectiveLateMinutes: finalMinutes,
            calculatedPenalty: penalty,
        };
    }
     
async detectRepeatedLateness(employeeId: string) {
    
    const records = await this.latenessRuleModel.db
        .collection('attendancerecords')
        .find({ employeeId })
        .toArray();

    if (!records.length) {
        return {
            success: true,
            message: "No attendance records found",
            repeatedLateness: 0,
        };
    }

    
    const latenessCount = records.filter(r => {
        return r.actualArrivalMinutes > r.allowedArrivalMinutes;
    }).length;

     
    const isRepeated = latenessCount >= 3;  

    return {
        success: true,
        repeatedLateness: latenessCount,
        isRepeated,
        action: isRepeated
            ? "Escalate to HR for disciplinary action"
            : "No escalation required",
    };
}

}
