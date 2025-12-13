import { Model, Types } from 'mongoose';
import { AttendanceCorrectionRequest, AttendanceCorrectionRequestDocument } from '../models/attendance-correction-request.schema';
import { AttendanceCorrectionRequestDto, UpdateAttendanceCorrectionRequestDto } from '../dtos/create-attendance-correction-request-dto';
export declare class AttendanceCorrectionRequestService {
    private readonly requestModel;
    constructor(requestModel: Model<AttendanceCorrectionRequestDocument>);
    submitCorrectionRequest(dto: AttendanceCorrectionRequestDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateCorrectionRequest(id: string, dto: UpdateAttendanceCorrectionRequestDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    approveCorrectionRequest(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    rejectCorrectionRequest(id: string, reason: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    listEmployeeCorrectionRequests(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceCorrectionRequest, {}, {}> & AttendanceCorrectionRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    autoEscalatePendingCorrections(): Promise<{
        escalatedCount: number;
    }>;
}
