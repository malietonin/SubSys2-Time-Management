import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';


export enum OvertimeType {
  EarlyIn = 'EarlyIn',
  LateOut = 'LateOut',
  OutOfHours = 'OutOfHours',
  Total='Total'
}



@Schema({ timestamps: true })
export class Overtime {
  @Prop({required: true, type: [mongoose.Schema.Types.ObjectId]})
       employeeId: mongoose.Schema.Types.ObjectId;

  @Prop({default: OvertimeType.Total })
  overtimeType: string;

  @Prop({ required: true })
  hourThresholds: number;

  @Prop({ required: true })
  approvalRequired: boolean;
}

export const OvertimeSchema = SchemaFactory.createForClass(Overtime);
export type OvertimeDocument = HydratedDocument<Overtime>
