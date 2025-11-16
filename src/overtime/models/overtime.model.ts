import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OvertimeDocument = Overtime & Document;

@Schema({ timestamps: true })
export class Overtime {
  @Prop({ required: true })
  employeeId: string;

  @Prop()
  department?: string;

  @Prop({ required: true })
  overtimeType: string;

  @Prop({ required: true })
  thresholds: number;

  @Prop({ required: true })
  approvalRequired: boolean;
}

export const OvertimeSchema = SchemaFactory.createForClass(Overtime);
