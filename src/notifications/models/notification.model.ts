import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

@Schema()
export class Notification{
    @Prop({required:true,})
    title: string

    @Prop({required:true})
    description: string

    @Prop({default: Date.now()})
    timestamp: Date

    @Prop({required:true, type: mongoose.Types.ObjectId})
    createdBy: mongoose.Types.ObjectId
}

export type NotificationDocument = HydratedDocument<Notification>
export const NotificationSchema = SchemaFactory.createForClass(Notification)
