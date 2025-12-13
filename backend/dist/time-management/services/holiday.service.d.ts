import { Model, Types } from 'mongoose';
import { Holiday, HolidayDocument } from '../models/holiday.schema';
import { CreateHolidayDto } from '../dtos/holiday-create-dto';
export declare class HolidayService {
    private holidayModel;
    constructor(holidayModel: Model<HolidayDocument>);
    createHoliday(dto: CreateHolidayDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Holiday, {}, {}> & Holiday & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Holiday, {}, {}> & Holiday & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllHolidays(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Holiday, {}, {}> & Holiday & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Holiday, {}, {}> & Holiday & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getActiveHolidays(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Holiday, {}, {}> & Holiday & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Holiday, {}, {}> & Holiday & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
}
