import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';


export type OvertimeDocument = Overtime & Document;

@Schema({ timestamps: true })
export class Overtime {
  @Prop({required: true, type: [mongoose.Schema.Types.ObjectId]})
       employeeId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  overtimeType: string;

  @Prop({ required: true })
  thresholds: number;

  @Prop({ required: true })
  approvalRequired: boolean;
}

export const OvertimeSchema = SchemaFactory.createForClass(Overtime);
export type OvertimeSchema = HydratedDocument<OvertimeDocument>
