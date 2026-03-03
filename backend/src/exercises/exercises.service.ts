import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
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
        return this.exerciseModel.find({}, { __v: 0 }).exec();
    }

    async findOne(id: string): Promise<Exercise> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid exercise ID format');
        }
        const exercise = await this.exerciseModel.findById(id, { __v: 0 }).exec();
        if (!exercise) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
        return exercise;
    }

    async create(exercise: Exercise): Promise<Exercise> {
        const newExercise = new this.exerciseModel(exercise);
        return newExercise.save();
    }

    async update(id: string, exercise: Partial<Exercise>): Promise<Exercise> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid exercise ID format');
        }
        const updatedExercise = await this.exerciseModel.findByIdAndUpdate(id, exercise, {
            new: true,
            projection: { __v: 0 },
        }).exec();
        if (!updatedExercise) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
        return updatedExercise;
    }

    async remove(id: string): Promise<{ deleted: boolean }> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid exercise ID format');
        }
        const result = await this.exerciseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }
        return { deleted: true };
    }
}
