import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OvertimeRule, OvertimeRuleDocument } from '../models/overtime-rule.schema';
import { OvertimeRuleCreateDto } from '../dtos/overtime-rule-create.dto';
import { OvertimeRuleUpdateDto } from '../dtos/overtime-rule-update.dto';

@Injectable()
export class OvertimeRuleService {
  constructor(
    @InjectModel(OvertimeRule.name)
    private readonly overtimeRuleModel: Model<OvertimeRuleDocument>,
  ) {}

   
  async createOvertimeRule(dto: OvertimeRuleCreateDto) {
    const created = await this.overtimeRuleModel.create(dto);

    return {
      success: true,
      message: 'Overtime rule created successfully',
      data: created,
    };
  }
 
  async listOvertimeRules() {
    return this.overtimeRuleModel.find();
  }

   
  async findById(id: string) {
    return this.overtimeRuleModel.findById(id);
  }

 
  async updateOvertimeRule(id: string, dto: OvertimeRuleUpdateDto) {
    const updated = await this.overtimeRuleModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Overtime rule not found');
    }

    return {
      success: true,
      message: 'Overtime rule updated successfully',
      data: updated,
    };
  }

 
  async deleteOvertimeRule(id: string) {
    const deleted = await this.overtimeRuleModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Overtime rule not found');
    }

    return {
      success: true,
      message: 'Overtime rule deleted successfully',
    };
  }
}
