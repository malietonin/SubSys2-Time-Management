import { InjectModel } from '@nestjs/mongoose';
import { NotificationLog, NotificationLogDocument, NotificationLogSchema } from './../models/notification-log.schema';
import { BadRequestException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { NotificationLogCreateDto } from '../dtos/notification-log-create-dto';

@Injectable()
export class NotificationLogService{
    constructor(
        @InjectModel(NotificationLog.name)
        private notificationLogModel: Model<NotificationLogDocument>,
    ){}
    async sendNotification(notifData:NotificationLogCreateDto){
        if(!notifData.to){
            throw new BadRequestException("Recepient cannot be empty!")
        }
        if(!notifData.type){
            throw new BadRequestException("Type cannot be empty!")
        }
        const notification = await this.notificationLogModel.create(notifData)
        return{
            success: true,
            message:"Notification sent successfully!",
            data: notification
        }
    }
}