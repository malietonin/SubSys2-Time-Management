import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FalsePenalty, FalsePenaltyDocument } from './models/falsePenalty.model';

@Injectable()
export class FalsePenaltyService {
  constructor(
    @InjectModel(FalsePenalty.name)
    private falsePenaltyModel: Model<FalsePenaltyDocument>,
  ) {}

  // create penalty
  create(data: any) {
    return this.falsePenaltyModel.create(data);
  }

  // get all penalties
  findAll() {
    return this.falsePenaltyModel.find();
  }
}
