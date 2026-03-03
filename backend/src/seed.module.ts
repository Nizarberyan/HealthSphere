import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './exercises/schemas/exercise.schema';
import { SeedCommand } from './seed.command';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/healthsphere'),
        MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }]),
    ],
    providers: [SeedCommand],
})
export class SeedModule { }
