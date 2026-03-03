import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { initialExercises } from './exercises/data/exercises';
import { Exercise, ExerciseDocument } from './exercises/schemas/exercise.schema';
import { Favorite, FavoriteDocument } from './favorites/schemas/favorite.schema';

@Command({ name: 'seed', description: 'Seed the database with initial exercises and clear favorites' })
@Injectable()
export class SeedCommand extends CommandRunner {
    private readonly logger = new Logger(SeedCommand.name);

    constructor(
        @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    ) {
        super();
    }

    async run(): Promise<void> {
        this.logger.log('Starting seeder...');

        const exerciseCount = await this.exerciseModel.countDocuments();
        if (exerciseCount > 0) {
            this.logger.log(`Found ${exerciseCount} existing exercises. Clearing exercises...`);
            await this.exerciseModel.deleteMany({});
        }

        const favoriteCount = await this.favoriteModel.countDocuments();
        if (favoriteCount > 0) {
            this.logger.log(`Found ${favoriteCount} existing favorites. Clearing favorites...`);
            await this.favoriteModel.deleteMany({});
        }

        this.logger.log(`Inserting ${initialExercises.length} initial exercises...`);
        await this.exerciseModel.insertMany(initialExercises);

        this.logger.log('Database seeded successfully!');
    }
}
