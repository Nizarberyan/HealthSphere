import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { initialExercises } from './data/exercises';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';

@Injectable()
export class ExercisesService implements OnModuleInit {
    constructor(
        @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
    ) { }

    async onModuleInit() {
        const count = await this.exerciseModel.countDocuments();
        if (count === 0) {
            await this.exerciseModel.insertMany(initialExercises);
            console.log('Seed: Inserted initial exercises');
        }
    }

    async findAll(): Promise<Exercise[]> {
        return this.exerciseModel.find({}, { _id: 0, __v: 0 }).exec();
    }

    async findOne(id: string): Promise<Exercise> {
        const exercise = await this.exerciseModel.findOne({ id }, { _id: 0, __v: 0 }).exec();
        if (!exercise) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
        return exercise;
    }
}
