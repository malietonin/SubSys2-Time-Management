import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TimeException, TimeExceptionDocument } from '../models/time-exception.schema';
import { TimeExceptionCreateDto } from '../dtos/create-time-exception.dto';
import { TimeExceptionUpdateDto } from '../dtos/update-time-exception.dto';

@Injectable()
export class TimeExceptionService {
  constructor(
    @InjectModel(TimeException.name)
    private readonly timeExceptionModel: Model<TimeExceptionDocument>,
  ) {}

  // CREATE
  async create(dto: TimeExceptionCreateDto) {
    const created = await this.timeExceptionModel.create(dto);
    return {
      success: true,
      message: 'Time Exception created successfully',
      data: created,
    };
  }

  // LIST
  async listAll() {
    return this.timeExceptionModel.find();
  }

  // UPDATE
  async update(id: string, dto: TimeExceptionUpdateDto) {
    const updated = await this.timeExceptionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException('Time Exception not found');
    }

    return {
      success: true,
      message: 'Time Exception updated successfully',
      data: updated,
    };
  }

  // DELETE
  async delete(id: string) {
    const deleted = await this.timeExceptionModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Time Exception not found');
    }

    return {
      success: true,
      message: 'Time Exception deleted',
    };
  }
  async approve(id: string, approvedBy: string) {
  const updated = await this.timeExceptionModel.findByIdAndUpdate(
    id,
    {
      status: 'APPROVED',
      approvedBy,
      approvedAt: new Date()
    },
    { new: true }
  );

  if (!updated) {
    throw new BadRequestException('Time Exception not found');
  }

  return {
    success: true,
    message: 'Time Exception approved successfully',
    data: updated,
  };
}


  async findById(id: string) {
    return this.timeExceptionModel.findById(id);
  }
  async reject(id: string, rejectedBy: string, reason: string) {
  const updated = await this.timeExceptionModel.findByIdAndUpdate(
    id,
    {
      status: 'REJECTED',
      rejectedBy,
      rejectedAt: new Date(),
      rejectionReason: reason
    },
    { new: true }
  );

  if (!updated) throw new BadRequestException('Time Exception not found');

  return {
    success: true,
    message: 'Time Exception rejected successfully',
    data: updated,
  };
}

}
