import { Model, Types } from "mongoose";
import { ShiftType, ShiftTypeDocument } from "../models/shift-type.schema";
import { ShiftTypeCreateDto } from "../dtos/shift-type-create-dto";
export declare class ShiftTypeService {
    private shiftTypeModel;
    constructor(shiftTypeModel: Model<ShiftTypeDocument>);
    createShiftType(shiftTypeData: ShiftTypeCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllShiftTypes(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getShiftTypeById(shiftTypeId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteShiftType(shiftTypeId: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ShiftType, {}, {}> & ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>) | null;
    }>;
}
