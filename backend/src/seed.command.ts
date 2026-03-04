import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { initialExercises } from './exercises/data/exercises';
import { Exercise, ExerciseDocument } from './exercises/schemas/exercise.schema';
import { Favorite, FavoriteDocument } from './favorites/schemas/favorite.schema';
import { Workout, WorkoutDocument } from './workouts/schemas/workout.schema';

const daysAgo = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
};

const daysFromNow = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString();
};

const sampleWorkouts = [
    // Past – completed
    { type: 'musculation', duration: 60, intensity: 'intense', date: daysAgo(1), status: 'terminé', notes: 'Séance poitrine / épaules' },
    { type: 'yoga', duration: 45, intensity: 'faible', date: daysAgo(2), status: 'terminé', notes: null },
    { type: 'vélo', duration: 90, intensity: 'modérée', date: daysAgo(3), status: 'terminé', notes: 'Sortie longue distance' },
    { type: 'natation', duration: 50, intensity: 'intense', date: daysAgo(5), status: 'terminé', notes: null },
    { type: 'musculation', duration: 55, intensity: 'modérée', date: daysAgo(7), status: 'terminé', notes: 'Jambes' },
    { type: 'course', duration: 25, intensity: 'faible', date: daysAgo(8), status: 'terminé', notes: 'Récupération active' },
    { type: 'autre', duration: 30, intensity: 'faible', date: daysAgo(10), status: 'terminé', notes: 'Stretching' },
    { type: 'vélo', duration: 70, intensity: 'intense', date: daysAgo(12), status: 'terminé', notes: null },
    { type: 'course', duration: 40, intensity: 'modérée', date: daysAgo(14), status: 'terminé', notes: 'Fartlek' },

    // Today + future – planned
    { type: 'course', duration: 35, intensity: 'modérée', date: daysAgo(0), status: 'prévu', notes: 'Sortie matinale' },
    { type: 'musculation', duration: 60, intensity: 'intense', date: daysFromNow(1), status: 'prévu', notes: 'Dos / biceps' },
    { type: 'yoga', duration: 45, intensity: 'faible', date: daysFromNow(2), status: 'prévu', notes: null },
    { type: 'natation', duration: 50, intensity: 'modérée', date: daysFromNow(3), status: 'prévu', notes: null },
    { type: 'vélo', duration: 80, intensity: 'intense', date: daysFromNow(4), status: 'prévu', notes: 'Sortie weekend' },
    { type: 'course', duration: 30, intensity: 'faible', date: daysFromNow(5), status: 'prévu', notes: 'Footing léger' },
    { type: 'musculation', duration: 55, intensity: 'modérée', date: daysFromNow(6), status: 'prévu', notes: 'Full body' },
];

@Command({ name: 'seed', description: 'Seed the database with initial exercises and clear favorites' })
@Injectable()
export class SeedCommand extends CommandRunner {
    private readonly logger = new Logger(SeedCommand.name);

    constructor(
        @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
        @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
    ) {
        super();
    }

    async run(): Promise<void> {
        this.logger.log('Starting seeder...');

        // Exercises
        const exerciseCount = await this.exerciseModel.countDocuments();
        if (exerciseCount > 0) {
            this.logger.log(`Found ${exerciseCount} existing exercises. Clearing exercises...`);
            await this.exerciseModel.deleteMany({});
        }
        this.logger.log(`Inserting ${initialExercises.length} initial exercises...`);
        await this.exerciseModel.insertMany(initialExercises);

        // Favorites
        const favoriteCount = await this.favoriteModel.countDocuments();
        if (favoriteCount > 0) {
            this.logger.log(`Found ${favoriteCount} existing favorites. Clearing favorites...`);
            await this.favoriteModel.deleteMany({});
        }

        // Workouts
        const workoutCount = await this.workoutModel.countDocuments();
        if (workoutCount > 0) {
            this.logger.log(`Found ${workoutCount} existing workouts. Clearing workouts...`);
            await this.workoutModel.deleteMany({});
        }
        this.logger.log(`Inserting ${sampleWorkouts.length} sample workouts...`);
        await this.workoutModel.insertMany(sampleWorkouts);

        this.logger.log('Database seeded successfully!');
    }
}
