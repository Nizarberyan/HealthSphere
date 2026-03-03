import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    category: string;

    @Prop()
    difficulty: string;

    @Prop()
    description: string;

    @Prop()
    duration: number;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
