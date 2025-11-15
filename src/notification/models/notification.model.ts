import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

export enum NotificationType {
  ShiftExpiry = 'ShiftExpiry',
  MissedPunch = 'MissedPunch',
  ApprovalPending = 'ApprovalPending',
  Escalation = 'Escalation',
  Other = 'Other',
}

@Schema()
export class Notification {
  @Prop({required: true, type: mongoose.Schema.Types.ObjectId})
  recipientId: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  message: string; 

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType; 

  @Prop({ default: false })
  readStatus: boolean; 

  @Prop({ default: Date.now })
  timestamp: Date; 
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
