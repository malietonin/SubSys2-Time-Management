import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { LatenessRule, LatenessRuleDocument } from '../models/lateness-rule.schema';
import { LatenessRuleCreateDto } from '../dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from '../dtos/lateness-rule-update.dto';

import {
  AttendanceRecord,
  AttendanceRecordDocument
} from '../../time-management/models/attendance-record.schema';

@Injectable()
export class LatenessRuleService {
  constructor(
    @InjectModel(LatenessRule.name)
    private readonly latenessRuleModel: Model<LatenessRuleDocument>,

    @InjectModel(AttendanceRecord.name)
    private readonly attendanceRecordModel: Model<AttendanceRecordDocument>
  ) {}

  // =============================
  // CREATE
  // =============================
  async createLatenessRule(dto: LatenessRuleCreateDto) {
    const created = await this.latenessRuleModel.create(dto);

    return {
      success: true,
      message: 'Lateness rule created successfully',
      data: created
    };
  }

  // =============================
  // LIST ALL RULES
  // =============================
  async listLatenessRules() {
    return this.latenessRuleModel.find();
  }

  // =============================
  // UPDATE
  // =============================
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
      data: updated
    };
  }

  // =============================
  // DELETE
  // =============================
  async deleteLatenessRule(id: string) {
    const deleted = await this.latenessRuleModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Lateness rule not found');
    }

    return {
      success: true,
      message: 'Lateness rule deleted successfully'
    };
  }

  // =============================
  // FIND BY ID
  // =============================
  async findById(id: string) {
    return this.latenessRuleModel.findById(id);
  }

  // =============================
  // GET ACTIVE RULE
  // =============================
  async getActiveRule() {
    const rule = await this.latenessRuleModel.findOne({ active: true });
    if (!rule) {
      throw new NotFoundException('No active lateness rule set.');
    }
    return rule;
  }

  // =============================
  // APPLY Lateness Penalty Logic
  // =============================
  async applyLatenessPenalty(actualMinutesLate: number, ruleId: string) {
    const rule = await this.latenessRuleModel.findById(ruleId);

    if (!rule) {
      throw new NotFoundException('Lateness rule not found');
    }

    const effectiveMinutes = actualMinutesLate - rule.gracePeriodMinutes;
    const finalMinutes = Math.max(effectiveMinutes, 0);

    const penalty = Math.round(finalMinutes * rule.deductionForEachMinute);

    return {
      success: true,
      ruleUsed: rule.name,
      effectiveLateMinutes: finalMinutes,
      calculatedPenalty: penalty
    };
  }

  // =============================
  // DETECT Repeated Lateness
  // (NO punch.isLate needed)
  // =============================
  async detectRepeatedLateness(employeeId: string) {
    const records = await this.attendanceRecordModel.find({
      employeeId: new Types.ObjectId(employeeId)
    });

    if (!records.length) {
      return {
        success: true,
        message: 'No attendance records found',
        repeatedLateness: 0
      };
    }

    let latenessCount = 0;

   
    for (const record of records) {
      const dayPunches = record.punches ?? [];

      const firstInPunch = dayPunches.find(p => p.type === 'IN');
      if (!firstInPunch) continue;

      const actual = new Date(firstInPunch.time);
      const expected = new Date();

      const diffMinutes = Math.floor((actual.getTime() - expected.getTime()) / 60000);

      if (diffMinutes > 0) {
        latenessCount++;
      }
    }

    const isRepeated = latenessCount >= 3;

    return {
      success: true,
      repeatedLateness: latenessCount,
      isRepeated,
      action: isRepeated
        ? 'Escalate to HR for disciplinary action'
        : 'No escalation required'
    };
  }
}
