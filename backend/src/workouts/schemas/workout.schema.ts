import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret: any) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
})
export class Workout {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: true })
    intensity: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true, default: 'prévu' })
    status: string;

    @Prop({ required: false })
    notes?: string;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
