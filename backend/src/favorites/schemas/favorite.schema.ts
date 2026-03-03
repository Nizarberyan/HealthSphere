import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
    @Prop({ required: true })
    exerciseId: string;

    @Prop({ required: true, default: 'default-user' })
    userId: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

// Compound index to ensure a user can only favorite an exercise once
FavoriteSchema.index({ exerciseId: 1, userId: 1 }, { unique: true });
