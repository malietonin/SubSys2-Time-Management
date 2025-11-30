import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { EmployeeProfile } from '../employee-profile/models/employee-profile.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmployeeProfile.name)
    private employeeProfileModel: Model<EmployeeProfile>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const existingEmployee = await this.employeeProfileModel.findOne({
      employeeNumber: registerDto.employeeNumber
    });

    if (existingEmployee) {
      throw new ConflictException('Employee number already exists');
    }

    const existingEmail = await this.employeeProfileModel.findOne({
      workEmail: registerDto.workEmail
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    await this.employeeProfileModel.create({
      employeeNumber: registerDto.employeeNumber,
      workEmail: registerDto.workEmail,
      password: hashedPassword,
    });

    return 'Registered successfully';
  }

  async signIn(
    employeeNumber: string,
    password: string
  ): Promise<{ access_token: string; payload: { userid: Types.ObjectId; roles: string[] } }> {
    const employee = await this.employeeProfileModel
      .findOne({ employeeNumber })
      .populate('accessProfileId');

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (!employee.password) {
      throw new UnauthorizedException('Password not set for this employee');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = employee.accessProfileId
      ? (employee.accessProfileId as any).roles || ['DEPARTMENT_EMPLOYEE']
      : ['DEPARTMENT_EMPLOYEE'];

    const payload = {
      userid: employee._id,
      roles,
      employeeNumber: employee.employeeNumber,
      email: employee.workEmail,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      payload: {
        userid: employee._id,
        roles,
      },
    };
  }

  async findByEmployeeNumber(employeeNumber: string) {
    return this.employeeProfileModel.findOne({ employeeNumber });
  }
}
