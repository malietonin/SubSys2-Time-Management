import { ShiftAssignmentStatus } from './models/enums/index';
import { EmployeeProfile,EmployeeProfileDocument } from './../employee-profile/models/employee-profile.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException, Controller } from '@nestjs/common';
import { Shift, ShiftDocument } from './models/shift.schema';
import { ShiftAssignment, ShiftAssignmentDocument, ShiftAssignmentSchema } from './models/shift-assignment.schema';
import { connection, Model } from 'mongoose';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Department,DepartmentDocument } from '../organization-structure/models/department.schema';
import { Position,PositionDocument } from '../organization-structure/models/position.schema';

@Injectable()
export class TimeManagementService {
constructor(
    @InjectModel(ShiftAssignment.name) 
    private shiftAssignmentModel: Model<ShiftAssignmentDocument>,
    @InjectModel(EmployeeProfile.name)
    private employeeProfileModel: Model<EmployeeProfileDocument>,
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    @InjectModel(Position.name)
    private positionModel:Model<PositionDocument>,
    @InjectModel(Shift.name)
    private shiftModel: Model<ShiftDocument>
    ){}
    async assignShift( assignData:{employeeID:Types.ObjectId,shiftId: Types.ObjectId, departmentID?:Types.ObjectId, positionID?:Types.ObjectId}){
        if(!assignData.employeeID && !assignData.departmentID && !assignData.positionID){
            throw new BadRequestException('Either Employee ID, Department ID or Position ID must be sent with the request.')
        }
        const assignmentMethods = [
            assignData.employeeID, assignData.departmentID, assignData.positionID
        ].filter(Boolean).length
        if(assignmentMethods>1){
            throw new BadRequestException('Only one of Employee ID, Position ID and Department ID can be provided.')
        }

        if(assignData.employeeID){
            const employee = await this.employeeProfileModel.findById(assignData.employeeID)
            if(!employee) throw new NotFoundException("Employee not found!")
        }
        if(assignData.departmentID){
            const department = await this.departmentModel.findById(assignData.departmentID)
            if(!department) throw new NotFoundException("Department not found!")
        }
        if(assignData.positionID){
            const position = await this.positionModel.findById(assignData.positionID)
            if(!position) throw new NotFoundException("Position not found!")
        }
        const shift = await this.shiftModel.findById(assignData.shiftId)
        if(!shift) throw new NotFoundException("Shift not found!")

        const assignment = await this.shiftAssignmentModel.create({
            shiftId: assignData.shiftId,
            employeeId: assignData.employeeID,
            departmentId: assignData.departmentID,
            positionId: assignData.positionID,
            startDate: Date.now(),
            status: ShiftAssignmentStatus.PENDING
        })
        return{
            success:true,
            message:"Shift assigned successfully!",
            data: assignment
        }

    }
}
