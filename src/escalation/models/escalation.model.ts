import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EscalationDocument = Escalation & Document;

@Schema({ timestamps: true })
export class Escalation {
  @Prop({ required: true })
  requestId: string;

  @Prop({ required: true })
  currentApprover: string;

  @Prop({ required: true })
  escalatedTo: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  escalationDate: Date;
}

export const EscalationSchema = SchemaFactory.createForClass(Escalation);
