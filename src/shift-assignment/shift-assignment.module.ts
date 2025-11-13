import { Module } from '@nestjs/common';
import { ShiftAssignmentSchema } from './models/shift-assignment.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftAssignmentController } from './shift-assignment.controller';
import { ShiftAssignmentService } from './shift-assignment.service';

@Module({
    imports:[MongooseModule.forFeature([{name: 'shift-assignment', schema: ShiftAssignmentSchema}])],
    controllers: [ShiftAssignmentController],
    providers: [ShiftAssignmentService]
})
export class ShiftAssignmentModule {}
