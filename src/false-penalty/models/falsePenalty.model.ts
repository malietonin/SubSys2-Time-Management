import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type FalsePenaltyDocument = FalsePenalty & Document;

@Schema({ timestamps: true })
export class FalsePenalty {

  //  Who the penalty belongs to
  @Prop({ required: true })
  employeeId: string;

  //  What type of false penalty (the only allowed values)
  @Prop({
    required: true,
    enum: ['Holiday', 'Leave'], 
  })
  type: string;

  //  Period where the penalty happened
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  //  Manager/System Admin who approved the correction
  @Prop({ required: true })
  approvedBy: string;
}

export const FalsePenaltySchema = SchemaFactory.createForClass(FalsePenalty);
