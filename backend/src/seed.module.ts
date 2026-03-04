import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './exercises/schemas/exercise.schema';
import { Favorite, FavoriteSchema } from './favorites/schemas/favorite.schema';
import { SeedCommand } from './seed.command';
import { Workout, WorkoutSchema } from './workouts/schemas/workout.schema';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthsphere'),
        MongooseModule.forFeature([
            { name: Exercise.name, schema: ExerciseSchema },
            { name: Favorite.name, schema: FavoriteSchema },
            { name: Workout.name, schema: WorkoutSchema },
        ]),
    ],
    providers: [SeedCommand],
})
export class SeedModule { }
