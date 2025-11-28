import { IsNotEmpty, IsOptional, IsEnum, IsString } from "class-validator";
import { CorrectionRequestStatus } from "../models/enums/index";

export class AttendanceCorrectionRequestDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string; 

  @IsNotEmpty()
  @IsString()
  attendanceRecordId: string; 

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(CorrectionRequestStatus)
  status?: CorrectionRequestStatus; 
}

export class UpdateAttendanceCorrectionRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  employeeId?: string; 

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  attendanceRecordId?: string; 

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(CorrectionRequestStatus)
  status?: CorrectionRequestStatus; 
}
