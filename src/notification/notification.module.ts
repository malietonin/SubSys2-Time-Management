import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Notification } from './models/notification.model';

@Module({
  imports: [MongooseModule.forFeature([{name: "Notification", schema: Notification}])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
