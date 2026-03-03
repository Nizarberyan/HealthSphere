import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { initialExercises } from './exercises/data/exercises';
import { Exercise, ExerciseDocument } from './exercises/schemas/exercise.schema';

@Command({ name: 'seed', description: 'Seed the database with initial exercises' })
@Injectable()
export class SeedCommand extends CommandRunner {
    private readonly logger = new Logger(SeedCommand.name);

    constructor(
        @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
    ) {
        super();
    }

    async run(): Promise<void> {
        this.logger.log('Starting seeder...');

        const count = await this.exerciseModel.countDocuments();
        if (count > 0) {
            this.logger.log(`Found ${count} existing exercises. Clearing database...`);
            await this.exerciseModel.deleteMany({});
        }

        this.logger.log(`Inserting ${initialExercises.length} initial exercises...`);
        await this.exerciseModel.insertMany(initialExercises);

        this.logger.log('Database seeded successfully!');
    }
}
