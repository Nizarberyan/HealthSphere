import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';

@Injectable()
export class WorkoutsService {
    constructor(
        @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
    ) { }

    async create(workoutData: Partial<Workout>): Promise<Workout> {
        const newWorkout = new this.workoutModel(workoutData);
        return newWorkout.save();
    }

    async findAll(): Promise<Workout[]> {
        return this.workoutModel.find().sort({ date: -1 }).exec();
    }

    async findOne(id: string): Promise<Workout> {
        const workout = await this.workoutModel.findById(id).exec();
        if (!workout) {
            throw new NotFoundException(`Workout #${id} not found`);
        }
        return workout;
    }

    async update(id: string, updateData: Partial<Workout>): Promise<Workout> {
        const existingWorkout = await this.workoutModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!existingWorkout) {
            throw new NotFoundException(`Workout #${id} not found`);
        }
        return existingWorkout;
    }

    async remove(id: string): Promise<any> {
        const deletedWorkout = await this.workoutModel.findByIdAndDelete(id).exec();
        if (!deletedWorkout) {
            throw new NotFoundException(`Workout #${id} not found`);
        }
        return deletedWorkout;
    }
}
