import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

@Schema()
export class Shift{
    @Prop()
        shiftType: string;
    @Prop()
        shiftName: string;
}
export type ShiftDocument = HydratedDocument<Shift>
const ShiftSchema = SchemaFactory.createForClass(Shift)